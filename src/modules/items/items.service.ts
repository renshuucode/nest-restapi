import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { Injectable, NotFoundException } from '@nestjs/common';

// export interface Item {
//   id: number;
//   name: string;
//   description?: string;
// }

@Injectable()
export class ItemsService {
  private items: Item[] = [];
  private idCounter = 1;

  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  findAll(): Promise<Item[]> {
    // return this.items;
    return this.itemsRepository.find({
      order: { createdAt: 'DESC' }, // 添加默认排序
    });
  }

  // findOne(id: number): Item {
  //   return this.items.find((item) => item.id === id);
  // }
  async findOne(id: number): Promise<Item> {
    const item = await this.itemsRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException(`Item #${id} not found`);
    }
    return item;
  }

  // create(createItemDto: CreateItemDto): Item {
  //   const newItem = {
  //     id: this.idCounter++,
  //     ...createItemDto,
  //   };
  //   this.items.push(newItem);
  //   return newItem;
  // }
  async create(createItemDto: CreateItemDto): Promise<Item> {
    const item = this.itemsRepository.create({
      ...createItemDto,
      // 自动生成 createdAt 和 updatedAt
    });
    return this.itemsRepository.save(item);
  }

  // update(id: number, updateItemDto: UpdateItemDto): Item {
  //   const index = this.items.findIndex((item) => item.id === id);
  //   if (index === -1) return null;

  //   this.items[index] = {
  //     ...this.items[index],
  //     ...updateItemDto,
  //   };
  //   return this.items[index];
  // }
  async update(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    const existingItem = await this.findOne(id); // 复用查找逻辑

    const updatedItem = this.itemsRepository.merge(existingItem, updateItemDto);

    return this.itemsRepository.save(updatedItem);
  }

  // delete(id: number): boolean {
  //   const index = this.items.findIndex((item) => item.id === id);
  //   if (index === -1) return false;

  //   this.items.splice(index, 1);
  //   return true;
  // }
  async delete(id: number): Promise<void> {
    const result = await this.itemsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Item #${id} not found`);
    }
  }
}
