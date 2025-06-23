import { MinLength, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  name: string;

  @IsString()
  @MinLength(8)
  @MaxLength(255)
  password: string;
}
