import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { PrismaService } from '../../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtSecret: config.get<string>('jwt.secret'),
    });
  }

  async validate(payload: any) {
    const admin = await this.prisma.admin.findFirst({
      where: { adminId: payload.sub },
    });

    if (!admin) throw new UnauthorizedException('admin not found');

    return { adminId: admin.adminId, email: admin.email, role: admin.role };
  }
}
