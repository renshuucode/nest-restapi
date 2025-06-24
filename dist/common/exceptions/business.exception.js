"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidCredentialsException = exports.UserAlreadyExistsException = exports.UserNotFoundException = exports.BusinessException = void 0;
const common_1 = require("@nestjs/common");
class BusinessException extends common_1.HttpException {
    constructor(message, statusCode = common_1.HttpStatus.BAD_REQUEST) {
        super(message, statusCode);
    }
}
exports.BusinessException = BusinessException;
class UserNotFoundException extends common_1.HttpException {
    constructor(id) {
        super(`用户 ID ${id} 不存在`, common_1.HttpStatus.NOT_FOUND);
    }
}
exports.UserNotFoundException = UserNotFoundException;
class UserAlreadyExistsException extends common_1.HttpException {
    constructor(name) {
        super(`用户名 "${name}" 已存在`, common_1.HttpStatus.CONFLICT);
    }
}
exports.UserAlreadyExistsException = UserAlreadyExistsException;
class InvalidCredentialsException extends common_1.HttpException {
    constructor() {
        super('用户名或密码错误', common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.InvalidCredentialsException = InvalidCredentialsException;
//# sourceMappingURL=business.exception.js.map