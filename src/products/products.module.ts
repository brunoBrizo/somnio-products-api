import { Logger, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductsService, Logger],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
