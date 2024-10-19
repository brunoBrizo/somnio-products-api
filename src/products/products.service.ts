import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { chunk } from 'lodash';
import { Product } from './entities/product';
import { BulkCreateProductDto } from './dtos/bulkCreateProduct';
import { map } from 'bluebird';

@Injectable()
export class ProductsService {
  constructor(private readonly dataSource: DataSource, private readonly logger: Logger) {}

  async createProducts({ products }: BulkCreateProductDto) {
    this.logger.log(`Start creating products`, {
      products: products.length,
    });

    const queryRunner = this.dataSource.createQueryRunner();

    try {
      const chunkSize = 500;
      const chunks = chunk(products, chunkSize);

      await queryRunner.connect();
      await queryRunner.startTransaction();
      const results = await map(
        chunks,
        async (productsChunk) => {
          return await queryRunner.manager.getRepository(Product).save(productsChunk);
        },
        { concurrency: 5 },
      );

      await queryRunner.commitTransaction();

      this.logger.log(`Finished creating products`, {
        products: products.length,
      });

      return results.flat();
    } catch (error) {
      await queryRunner.rollbackTransaction();

      this.logger.error(`Error creating products`, {
        products: products.length,
        error,
      });

      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
