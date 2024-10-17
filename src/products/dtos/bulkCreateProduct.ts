import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { ProductDto } from './product.dto';

export class BulkCreateProductDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];
}
