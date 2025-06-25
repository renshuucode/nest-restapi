import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './entities/user.entity';
interface AuthenticatedUser {
    id: number;
    name: string;
    role: UserRole;
    email?: string;
}
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    findAll(): Promise<import("./entities/user.entity").User[]>;
    findOne(id: number, currentUser: AuthenticatedUser): Promise<import("./entities/user.entity").User>;
    update(id: number, updateUserDto: UpdateUserDto, currentUser: AuthenticatedUser): Promise<import("./entities/user.entity").User>;
    remove(id: number): Promise<void>;
}
export {};
