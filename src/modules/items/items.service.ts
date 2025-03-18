import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  findAll(): Promise<Item[]> {
    return this.itemsRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Item> {
    const item = await this.itemsRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException(`Item #${id} not found`);
    }
    return item;
  }

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const item = this.itemsRepository.create({
      ...createItemDto,
    });
    return this.itemsRepository.save(item);
  }

  async update(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    const existingItem = await this.findOne(id);
    const updatedItem = this.itemsRepository.merge(existingItem, updateItemDto);
    return this.itemsRepository.save(updatedItem);
  }

  async delete(id: number): Promise<void> {
    const result = await this.itemsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Item #${id} not found`);
    }
  }
}
