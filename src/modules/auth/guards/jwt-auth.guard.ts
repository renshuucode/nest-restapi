import { UnauthorizedException, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  handleRequest(err: any, email: any) {
    if (err) {
      this.logger.error(`认证错误: ${err.message}`);
      throw new UnauthorizedException('无效的认证令牌');
    }

    if (!email) {
      this.logger.warn('认证失败: 未提供有效的邮箱');
      throw new UnauthorizedException('无效的认证令牌');
    }

    this.logger.log(`用户认证成功: ${email}`);
    return email;
  }
}
