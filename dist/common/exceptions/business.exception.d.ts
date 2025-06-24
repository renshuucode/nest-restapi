import { HttpException, HttpStatus } from '@nestjs/common';
export declare class BusinessException extends HttpException {
    constructor(message: string, statusCode?: HttpStatus);
}
export declare class UserNotFoundException extends HttpException {
    constructor(id: number);
}
export declare class UserAlreadyExistsException extends HttpException {
    constructor(name: string);
}
export declare class InvalidCredentialsException extends HttpException {
    constructor();
}
