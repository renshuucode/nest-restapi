import {
  MinLength,
  IsString,
  MaxLength,
  IsNotEmpty,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名必须是字符串' })
  @MinLength(2, { message: '用户名不能少于2个字符' })
  @MaxLength(255, { message: '用户名不能超过255个字符' })
  @Matches(/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/, {
    message: '用户名只能包含字母、数字、下划线和中文',
  })
  name: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码必须是字符串' })
  @MinLength(8, { message: '密码不能少于8个字符' })
  @MaxLength(255, { message: '密码不能超过255个字符' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, {
    message: '密码必须包含至少一个小写字母、一个大写字母和一个数字',
  })
  password: string;
}
