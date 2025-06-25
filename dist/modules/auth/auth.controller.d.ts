import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
interface AuthenticatedUser {
    id: number;
    name: string;
    role: string;
    email?: string;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: number;
            name: string;
            role: import("../users/entities/user.entity").UserRole;
        };
    }>;
    getUserInfo(user: AuthenticatedUser): Promise<{
        id: number;
        name: string;
        role: import("../users/entities/user.entity").UserRole;
        created_at: Date;
        updated_at: Date;
    }>;
}
export {};
