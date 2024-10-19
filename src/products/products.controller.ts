import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';
import { BulkCreateProductDto } from './dtos/bulkCreateProduct';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async bulkCreateProducts(@Body() bulkCreateProductDto: BulkCreateProductDto) {
    return this.productsService.createProducts(bulkCreateProductDto);
  }
}
