import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { Strategy } from 'passport-jwt';
export interface JwtPayload {
    sub: number;
    name: string;
    role: string;
    iat?: number;
    exp?: number;
}
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private usersService;
    constructor(configService: ConfigService, usersService: UsersService);
    validate(payload: JwtPayload): Promise<{
        id: number;
        name: string;
        role: import("../../users/entities/user.entity").UserRole;
    }>;
}
export {};
