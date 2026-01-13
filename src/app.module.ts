import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from './auth/module/auth.module';
import { AppConfigModule } from './config/config.module';

@Module({
  imports: [PrismaModule, AuthModule, AppConfigModule],
})
export class AppModule {}
