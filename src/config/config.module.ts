import { envValidationSchima } from './env.validation';
import superAdminConfig from './super-admin.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import dbConfig from './database.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [superAdminConfig, jwtConfig,dbConfig],
      validationSchema: envValidationSchima,
    }),
  ],
})
export class AppConfigModule {}
