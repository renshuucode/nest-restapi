import { UserRole } from '../../users/entities/user.entity';
export declare class RegisterDto {
    name: string;
    password: string;
    email?: string;
    role?: UserRole;
}
