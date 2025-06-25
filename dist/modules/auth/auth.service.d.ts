import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/entities/user.entity';
export declare class AuthService {
    private usersService;
    private jwtService;
    private readonly logger;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(name: string, password: string): Promise<Omit<User, 'password'> | null>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: number;
            name: string;
            role: import("../users/entities/user.entity").UserRole;
        };
    }>;
    register(registerDto: RegisterDto): Promise<{
        access_token: string;
        user: {
            id: number;
            name: string;
            role: import("../users/entities/user.entity").UserRole;
            created_at: Date;
            updated_at: Date;
        };
    }>;
    getUserInfo(userId: number): Promise<{
        id: number;
        name: string;
        role: import("../users/entities/user.entity").UserRole;
        created_at: Date;
        updated_at: Date;
    }>;
}
