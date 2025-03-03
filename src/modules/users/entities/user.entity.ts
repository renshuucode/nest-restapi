// import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// @Entity()
// export class User {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({
//     type: 'varchar',
//     length: 255,
//     unique: true,
//   })
//   email: string;

//   @Column({
//     name: 'password_hash',
//     type: 'varchar',
//     length: 255,
//   })
//   passwordHash: string;

//   @Column({
//     type: 'enum',
//     enum: ['user', 'admin'],
//     default: 'user',
//   })
//   role: string;
// }

// users/entities/user.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    comment: '用户名称',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
    comment: '用户唯一登录标识',
  })
  @Index('IDX_USER_EMAIL', { unique: true })
  email: string;

  @Column({
    name: 'password_hash',
    type: 'varchar',
    length: 255,
    comment: 'BCrypt加密后的密码',
  })
  passwordHash: string;

  @Column({
    type: 'enum',
    enum: ['user', 'admin', 'moderator'],
    default: 'user',
    comment: '用户权限等级',
  })
  role: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
