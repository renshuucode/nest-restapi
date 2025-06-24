import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  MinLength,
  IsOptional,
  IsString,
  MaxLength,
  Matches,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString({ message: '用户名必须是字符串' })
  @MinLength(2, { message: '用户名至少需要2个字符' })
  @MaxLength(50, { message: '用户名不能超过50个字符' })
  @Matches(/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/, {
    message: '用户名只能包含字母、数字、下划线和中文',
  })
  name?: string;

  @IsOptional()
  @IsString({ message: '密码必须是字符串' })
  @MinLength(8, { message: '密码至少需要8个字符' })
  @MaxLength(128, { message: '密码不能超过128个字符' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, {
    message: '密码必须包含至少一个小写字母、一个大写字母和一个数字',
  })
  password?: string;
}
