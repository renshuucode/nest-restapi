import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('items') // 指定数据库表名
export class Item {
  @PrimaryGeneratedColumn('increment') // 自增主键
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    comment: '商品名称（唯一标识）',
  })
  @Index('IDX_ITEM_NAME', { unique: true }) // 创建唯一索引
  name: string;

  @Column({
    type: 'text', // 适合长文本
    nullable: true,
    comment: '商品详细描述',
    default: null,
  })
  description?: string;

  @CreateDateColumn({
    type: 'timestamp',
    precision: 0,
    comment: '创建时间',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    precision: 0,
    comment: '最后更新时间',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
