"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
let AuthService = AuthService_1 = class AuthService {
    usersService;
    jwtService;
    logger = new common_1.Logger(AuthService_1.name);
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(name, password) {
        try {
            const user = await this.usersService.findByName(name);
            if (user && (await bcrypt.compare(password, user.password))) {
                const { password, ...result } = user;
                this.logger.log(`用户 ${name} 登录成功`);
                return result;
            }
            return null;
        }
        catch (error) {
            this.logger.error(`用户 ${name} 登录失败: ${error instanceof Error ? error.message : '未知错误'}`);
            return null;
        }
    }
    async login(loginDto) {
        const user = await this.validateUser(loginDto.name, loginDto.password);
        if (!user) {
            throw new common_1.UnauthorizedException('用户名或密码错误');
        }
        const payload = {
            sub: user.id,
            name: user.name,
            role: user.role,
        };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                name: user.name,
                role: user.role,
            },
        };
    }
    async register(registerDto) {
        try {
            const user = await this.usersService.create(registerDto);
            const { password, ...result } = user;
            const payload = {
                sub: user.id,
                name: user.name,
                role: user.role,
            };
            return {
                access_token: this.jwtService.sign(payload),
                user: result,
            };
        }
        catch (error) {
            this.logger.error(`注册用户失败: ${error instanceof Error ? error.message : '未知错误'}`);
            throw error;
        }
    }
    async getUserInfo(userId) {
        const user = await this.usersService.findOne(userId);
        const { password, ...result } = user;
        return result;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map