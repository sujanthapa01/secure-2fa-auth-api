import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth-service/auth.service';
import { TotpService } from '../services/totp-service/totp.service';
import {PrismaModule} from '../../../prisma/prisma.module'

@Module({
  imports:[PrismaModule],
  controllers: [AuthController],
  providers: [AuthService, TotpService],
})
export class AuthModule {}
