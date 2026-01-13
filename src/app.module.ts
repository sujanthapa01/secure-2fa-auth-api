import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import {AppConfigModule} from "./config/config.module"

@Module({
  imports: [PrismaModule, AuthModule,AppConfigModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
