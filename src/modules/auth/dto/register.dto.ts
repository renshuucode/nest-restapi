import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
  IsEmail,
  IsEnum,
} from 'class-validator';
import { UserRole } from '../../users/entities/user.entity';

export class RegisterDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名必须是字符串' })
  @MinLength(2, { message: '用户名至少需要2个字符' })
  @MaxLength(50, { message: '用户名不能超过50个字符' })
  @Matches(/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/, {
    message: '用户名只能包含字母、数字、下划线和中文',
  })
  name: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码必须是字符串' })
  @MinLength(8, { message: '密码至少需要8个字符' })
  @MaxLength(128, { message: '密码不能超过128个字符' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, {
    message: '密码必须包含至少一个小写字母、一个大写字母和一个数字',
  })
  password: string;

  @IsOptional()
  @IsEmail({}, { message: '请输入有效的邮箱地址' })
  @MaxLength(255, { message: '邮箱长度不能超过255个字符' })
  email?: string;

  @IsOptional()
  @IsEnum(UserRole, { message: '角色必须是有效的用户角色' })
  role?: UserRole;
}
