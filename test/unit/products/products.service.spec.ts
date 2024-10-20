import { Logger } from '@nestjs/common';
import { BulkCreateProductDto } from '@products/dtos/bulkCreateProduct';
import { ProductsService } from '@products/products.service';
import { DataSource } from 'typeorm';

describe('ProductsService', () => {
  let service: ProductsService;
  let queryRunnerMock;
  let dataSourceMock;
  let loggerMock;

  beforeEach(() => {
    queryRunnerMock = {
      connect: jest.fn(),
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      release: jest.fn(),
      manager: {
        getRepository: jest.fn(),
      },
    };

    dataSourceMock = {
      createQueryRunner: jest.fn().mockReturnValue(queryRunnerMock),
    } as unknown as DataSource;

    loggerMock = {
      log: jest.fn(),
      error: jest.fn(),
    } as unknown as Logger;

    service = new ProductsService(dataSourceMock, loggerMock);

    queryRunnerMock = {
      connect: jest.fn(),
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      release: jest.fn(),
      manager: {
        save: jest.fn(),
        getRepository: jest.fn().mockReturnValue({
          save: jest.fn(),
        }),
      },
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createProducts', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should successfully create products', async () => {
      const dto: BulkCreateProductDto = {
        products: [
          { id: '1', name: 'Product 1', description: 'Description 1', tags: ['tag1', 'tag2'] },
          { id: '2', name: 'Product 2', description: 'Description 2', tags: ['tag2', 'tag3'] },
        ],
      };

      jest.spyOn(dataSourceMock, 'createQueryRunner').mockReturnValueOnce(queryRunnerMock);
      queryRunnerMock.manager.getRepository().save.mockResolvedValueOnce(dto.products);

      const result = await service.createProducts(dto);

      expect(result).toEqual(dto.products);
      expect(queryRunnerMock.connect).toHaveBeenCalled();
      expect(queryRunnerMock.startTransaction).toHaveBeenCalled();
      expect(queryRunnerMock.commitTransaction).toHaveBeenCalled();
      expect(queryRunnerMock.release).toHaveBeenCalled();
      expect(loggerMock.log).toHaveBeenCalledTimes(2);
    });

    it('should handle large number of products', async () => {
      const products = Array.from({ length: 1000 }, (_, i) => ({
        id: `${i + 1}`,
        name: `Product ${i + 1}`,
        description: `Description ${i + 1}`,
        tags: ['tag1', 'tag2'],
      }));
      const dto: BulkCreateProductDto = { products };

      jest.spyOn(dataSourceMock, 'createQueryRunner').mockReturnValueOnce(queryRunnerMock);
      queryRunnerMock.manager.getRepository().save.mockResolvedValueOnce(dto.products);

      const result = await service.createProducts(dto);

      expect(result).toEqual(dto.products);
      expect(queryRunnerMock.connect).toHaveBeenCalled();
      expect(queryRunnerMock.startTransaction).toHaveBeenCalled();
      expect(queryRunnerMock.commitTransaction).toHaveBeenCalled();
      expect(queryRunnerMock.release).toHaveBeenCalled();
    });

    it('should rollback transaction and throw error on failure', async () => {
      const dto: BulkCreateProductDto = {
        products: [{ id: '1', name: 'Product 1', description: 'Description 1', tags: ['tag1'] }],
      };

      const error = new Error('Database error');

      jest.spyOn(dataSourceMock, 'createQueryRunner').mockReturnValueOnce(queryRunnerMock);
      queryRunnerMock.manager.getRepository().save.mockRejectedValueOnce(error);

      await expect(service.createProducts(dto)).rejects.toThrow('Database error');

      expect(queryRunnerMock.rollbackTransaction).toHaveBeenCalled();
      expect(queryRunnerMock.release).toHaveBeenCalled();
      expect(loggerMock.error).toHaveBeenCalled();
    });
  });
});
