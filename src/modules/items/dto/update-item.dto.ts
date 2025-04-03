import { PartialType } from '@nestjs/mapped-types/dist/partial-type.helper';
import { CreateItemDto } from './create-item.dto';

export class UpdateItemDto extends PartialType(CreateItemDto) {}
