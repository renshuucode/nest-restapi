// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { User } from './entities/user.entity';

// @Injectable()
// export class UsersService {
//   constructor(
//     @InjectRepository(User)
//     private usersRepository: Repository<User>,
//   ) {}

//   findAll(): Promise<User[]> {
//     return this.usersRepository.find();
//   }

//   findOne(id: number): Promise<User> {
//     return this.usersRepository.findOneBy({ id });
//   }

//   create(user: User): Promise<User> {
//     return this.usersRepository.save(user);
//   }

//   async update(id: number, user: User): Promise<void> {
//     await this.usersRepository.update(id, user);
//   }

//   async remove(id: number): Promise<void> {
//     await this.usersRepository.delete(id);
//   }
// }

// users/users.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // 用户注册逻辑
  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findOneByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('该邮箱已被注册');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    return this.usersRepository.save({
      name: createUserDto.name,
      email: createUserDto.email,
      passwordHash: hashedPassword,
      role: 'user',
    });
  }

  // 查询所有用户
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  // 通过 email 查询用户（排除敏感字段）
  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'passwordHash', 'role'],
    });
  }

  // 通过 id 查询用户（排除敏感字段）
  async findOneById(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { id },
      select: ['id', 'email', 'passwordHash', 'role'],
    });
  }

  // 用户信息更新逻辑
  async updateUser(id: number, updateData: Partial<User>): Promise<User> {
    await this.usersRepository.update(id, updateData);
    return this.usersRepository.findOneBy({ id });
  }

  // 删除用户
  async removeUserById(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
