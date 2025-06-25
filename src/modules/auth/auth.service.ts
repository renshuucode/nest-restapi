import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    name: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    try {
      const user = await this.usersService.findByName(name);
      if (user && (await bcrypt.compare(password, user.password))) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        this.logger.log(`用户 ${name} 登录成功`);
        return result;
      }
      return null;
    } catch (error) {
      this.logger.error(
        `用户 ${name} 登录失败: ${error instanceof Error ? error.message : '未知错误'}`,
      );
      return null;
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.name, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('用户名或密码错误');
    }
    const payload = {
      sub: user.id,
      name: user.name,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    try {
      const user = await this.usersService.create(registerDto);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      const payload = {
        sub: user.id,
        name: user.name,
        role: user.role,
      };
      return {
        access_token: this.jwtService.sign(payload),
        user: result,
      };
    } catch (error) {
      this.logger.error(
        `注册用户失败: ${error instanceof Error ? error.message : '未知错误'}`,
      );
      throw error;
    }
  }

  async getUserInfo(userId: number) {
    const user = await this.usersService.findOne(userId);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }
}
