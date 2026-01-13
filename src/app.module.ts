import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { PrismaModule } from 'prisma/prisma.module';


@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [AuthService],
})
export class AppModule {}
