import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
export interface Item {
  id: number;
  name: string;
  description?: string;
}

@Injectable()
export class ItemsService {
  private items: Item[] = [];
  private idCounter = 1;

  findAll(): Item[] {
    return this.items;
  }

  findOne(id: number): Item {
    return this.items.find((item) => item.id === id);
  }

  create(createItemDto: CreateItemDto): Item {
    const newItem = {
      id: this.idCounter++,
      ...createItemDto,
    };
    this.items.push(newItem);
    return newItem;
  }

  update(id: number, updateItemDto: UpdateItemDto): Item {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) return null;

    this.items[index] = {
      ...this.items[index],
      ...updateItemDto,
    };
    return this.items[index];
  }

  delete(id: number): boolean {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) return false;

    this.items.splice(index, 1);
    return true;
  }
}
