import { Test, TestingModule } from '@nestjs/testing';
import { BulkCreateProductDto } from '@products/dtos/bulkCreateProduct';
import { Product } from '@products/entities/product';
import { ProductsController } from '@products/products.controller';
import { ProductsService } from '@products/products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let productsService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            createProducts: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    productsService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('bulkCreateProducts', () => {
    it('should call productsService.createProducts with the provided dto', async () => {
      const dto: BulkCreateProductDto = {
        products: [{ id: '1', name: 'Test Product', description: 'Test Description', tags: ['tag1', 'tag2'] }],
      };

      await controller.bulkCreateProducts(dto);
      expect(productsService.createProducts).toHaveBeenCalledWith(dto);
    });

    it('should return the result from productsService.createProducts', async () => {
      const dto: BulkCreateProductDto = {
        products: [{ id: '1', name: 'Test Product', description: 'Test Description', tags: ['tag1', 'tag2'] }],
      };

      const expectedResult = [
        { id: '1', name: 'Test Product', description: 'Test Description', tags: ['tag1', 'tag2'] },
      ] as Product[];

      jest.spyOn(productsService, 'createProducts').mockResolvedValue(expectedResult);

      const result = await controller.bulkCreateProducts(dto);
      expect(result).toEqual(expectedResult);
    });

    it('should handle empty product list', async () => {
      const dto: BulkCreateProductDto = { products: [] };
      const expectedResult = [];

      jest.spyOn(productsService, 'createProducts').mockResolvedValue(expectedResult);

      const result = await controller.bulkCreateProducts(dto);
      expect(result).toEqual(expectedResult);
    });

    it('should handle large number of products', async () => {
      const productsList = Array.from({ length: 1000 }, (_, index) => ({
        id: (index + 1).toString(),
        name: `Test Product ${index + 1}`,
        description: 'Test Description',
        tags: ['tag1', 'tag2'],
      })) as Product[];

      const dto: BulkCreateProductDto = { products: productsList };
      jest.spyOn(productsService, 'createProducts').mockResolvedValue(productsList);

      const result = await controller.bulkCreateProducts(dto);
      expect(result.length).toBe(1000);
    });

    it('should throw an error if productsService.createProducts throws', async () => {
      const dto: BulkCreateProductDto = {
        products: [{ id: '1', name: 'Test Product', description: 'Test Description', tags: ['tag1', 'tag2'] }],
      };

      const errorMessage = 'Error creating products';
      jest.spyOn(productsService, 'createProducts').mockRejectedValue(new Error(errorMessage));

      await expect(controller.bulkCreateProducts(dto)).rejects.toThrow(errorMessage);
    });
  });
});
