import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth-service/auth.service';
import { LoginDto, RegisterDto } from '../dto/auth.dto';
import { Roles } from 'src/common/decorators/roles.decorators';
import { AdminRole } from 'src/common/num/admin-role.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // @Roles[AdminRole.SUPER_ADMIN]
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.createAdmin(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('get-qr')
  async getQrOnDemand(@Body() body: { adminId: string }) {
    const { adminId } = body
    return this.authService.getQrOnDemand(adminId)
  }

  @HttpCode(HttpStatus.OK)
  @Post('verify-otp')
  async verifyOtp(@Body() body: { adminId: string; token: string }) {
    return this.authService.verifyToken(body.adminId, body.token);
  }
}
