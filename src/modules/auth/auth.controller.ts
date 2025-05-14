import {
  Controller,
  Post,
  Body,
  UseGuards,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    this.logger.log(`尝试登录: ${loginDto.email}`);

    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      this.logger.warn(`登录失败: ${loginDto.email}`);
      throw new UnauthorizedException('邮箱或密码错误');
    }

    this.logger.log(`登录成功: ${loginDto.email}`);
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('validate')
  async validateToken() {
    return { valid: true };
  }
}
