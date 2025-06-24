import { HttpException, HttpStatus } from '@nestjs/common';

export class BusinessException extends HttpException {
  constructor(message: string, statusCode = HttpStatus.BAD_REQUEST) {
    super(message, statusCode);
  }
}

export class UserNotFoundException extends HttpException {
  constructor(id: number) {
    super(`用户 ID ${id} 不存在`, HttpStatus.NOT_FOUND);
  }
}

export class UserAlreadyExistsException extends HttpException {
  constructor(name: string) {
    super(`用户名 "${name}" 已存在`, HttpStatus.CONFLICT);
  }
}

export class InvalidCredentialsException extends HttpException {
  constructor() {
    super('用户名或密码错误', HttpStatus.UNAUTHORIZED);
  }
}
