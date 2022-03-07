import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { Logger } from '@nestjs/common';
import { AuthService } from './auth.service';

describe('AuthController', () => {
 let controller: AuthController;
 const mockAuthService = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService,Logger]
    })
    .overrideProvider(AuthService)
    .useValue(mockAuthService)
    .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
