import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { LoginDto, RegisterDto } from '../../dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { TotpService } from '../totp-service/totp.service';

type TAdmin = {
  AdminId: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly totpService: TotpService,
  ) {}

  /**
   *
   * @param registerDto {email, password, name}
   * @returns
   */

  async createAdmin(registerDto: RegisterDto): Promise<TAdmin> {
    const { email, password, name } = registerDto;

    if (!email || password) {
      throw new UnauthorizedException(`email and password is required`);
    }

    try {
      const hash = await bcrypt.hash(password, 10);

      const admin = await this.prisma.admin.create({
        data: {
          name: name,
          email: email,
          password: hash,
          role: 'ADMIN',
        },
      });

      return {
        AdminId: admin.adminId,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        createdAt: admin.createdAt,
      };
    } catch (error) {
      if (
        error instanceof ConflictException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        'omething went wrong while registering the admin',
      );
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    if (!email || !password)
      throw new UnauthorizedException('email and password are required');

    const admin = await this.prisma.admin.findFirst({ where: { email } });

    if (!admin || !admin.isActive) {
      throw new UnauthorizedException('unauthorized login');
    }

    const valid = await bcrypt.compare(password, admin.password);

    if (!valid) {
      throw new UnauthorizedException('wrong password');
    }

    if (!admin.totpSecret) {
      const secret = this.totpService.generateSecret(admin.email);
      await this.prisma.admin.update({
        where: { adminId: admin.adminId },
        data: { totpSecret: secret.base32 },
      });

      const qrCode = await this.totpService.generateQrCode(secret.otpauth_url);

      return { requireTotp: true, qrCode, adminId: admin.adminId };
    }
  }

  async verifyToken(adminId: string, token: string) {
    const admin = await this.prisma.admin.findFirst({ where: { adminId } });

    if (!admin || !admin.totpSecret)
      throw new UnauthorizedException('TOTP not setup');

    const valid = this.totpService.verifyOtp(admin.totpSecret, token);

    if (!valid) throw new UnauthorizedException('Invalid OTP');
  }
}
