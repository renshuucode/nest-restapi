export declare enum UserRole {
    ADMIN = "admin",
    USER = "user",
    GUEST = "guest"
}
export declare class User {
    id: number;
    name: string;
    password: string;
    role: UserRole;
    created_at: Date;
    updated_at: Date;
}
