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
      secretOrKey: config.get<string>('jwt.secret')|| "wqycxeb78dy387o23y8o23ys472834",
    });
  }

  async validate(payload: any) {
    const admin = await this.prisma.admin.findFirst({
      where: { adminId: payload.sub },
    });

    if (!admin) throw new UnauthorizedException('admin not found');

    console.log("hii this is jwt strategy")
    return { adminId: admin.adminId, email: admin.email, role: admin.role };
  }
}
