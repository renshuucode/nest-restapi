// src/auth/dto/login.dto.ts
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail(
    {},
    {
      message: '请输入有效的电子邮件地址',
      context: { errorCode: 'INVALID_EMAIL_FORMAT' },
    },
  )
  @IsNotEmpty({
    message: '邮箱不能为空',
    context: { errorCode: 'EMAIL_REQUIRED' },
  })
  email: string;

  @IsString({
    message: '密码必须为字符串类型',
    context: { errorCode: 'PASSWORD_TYPE_ERROR' },
  })
  @IsNotEmpty({
    message: '密码不能为空',
    context: { errorCode: 'PASSWORD_REQUIRED' },
  })
  password: string;
}
