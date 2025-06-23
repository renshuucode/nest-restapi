import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): import("./entities/user.entity").User;
    findAll(): import("./entities/user.entity").User[];
    findOne(id: number): import("./entities/user.entity").User;
    update(id: number, updateUserDto: UpdateUserDto): import("./entities/user.entity").User;
    remove(id: number): void;
}
