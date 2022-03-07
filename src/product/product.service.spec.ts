import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const mockProductService = {}
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService],
    })
    .overrideProvider(ProductService)
    .useValue(mockProductService)
    .compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
