import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth-service/auth.service';
import { TotpService } from '../services/totp-service/totp.service';
import { PrismaModule } from '../../../prisma/prisma.module'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService, ConfigModule } from "@nestjs/config"
import {JwtStrategy} from "../strategies/jwt.strategy"

@Module({
  imports: [PrismaModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      secret: config.get<string>('jwt.secret'),
      signOptions: {
        expiresIn: '30m'
      }

    })
  })],
  controllers: [AuthController],
  providers: [AuthService, TotpService,JwtStrategy],
})
export class AuthModule { }
