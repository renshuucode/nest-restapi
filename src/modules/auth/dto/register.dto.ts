// src/auth/dto/register.dto.ts
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  Validate,
  IsNotEmpty,
} from 'class-validator';
import { PasswordConfirmValidator } from '../validators/password-confirm.validator';

export class RegisterDto {
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
  @MinLength(8, {
    message: '密码长度不能少于8个字符',
    context: { errorCode: 'PASSWORD_MIN_LENGTH' },
  })
  @MaxLength(20, {
    message: '密码长度不能超过20个字符',
    context: { errorCode: 'PASSWORD_MAX_LENGTH' },
  })
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, {
    message: '密码必须包含至少一个大写字母、一个小写字母和一个数字',
    context: { errorCode: 'PASSWORD_COMPLEXITY_FAIL' },
  })
  password: string;

  @IsString({
    message: '确认密码必须为字符串类型',
    context: { errorCode: 'CONFIRM_PASSWORD_TYPE_ERROR' },
  })
  @Validate(PasswordConfirmValidator, ['password'], {
    message: '两次输入的密码不一致',
    context: { errorCode: 'PASSWORD_MISMATCH' },
  })
  passwordConfirm: string;
}
