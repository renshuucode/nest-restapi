"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
let UsersService = class UsersService {
    users = [
        {
            id: 1,
            name: 'John Doe 1',
            password: 'john_doe_password',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 2,
            name: 'Jane Doe 2',
            password: 'jane_doe_password',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];
    nextId = 3;
    create(createUserDto) {
        const newUser = {
            id: this.nextId++,
            ...createUserDto,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.users.push(newUser);
        return newUser;
    }
    findAll() {
        return this.users;
    }
    findOne(id) {
        const user = this.users.find((user) => user.id === id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    update(id, updateUserDto) {
        const userIndex = this.users.findIndex((user) => user.id === id);
        if (userIndex === -1) {
            throw new common_1.NotFoundException('User not found');
        }
        const updatedUser = {
            ...this.users[userIndex],
            ...updateUserDto,
            updatedAt: new Date(),
        };
        this.users[userIndex] = updatedUser;
        return updatedUser;
    }
    remove(id) {
        const userIndex = this.users.findIndex((user) => user.id === id);
        if (userIndex === -1) {
            throw new common_1.NotFoundException('User not found');
        }
        this.users.splice(userIndex, 1);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map