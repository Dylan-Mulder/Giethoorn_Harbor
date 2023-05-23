import { Test, TestingModule } from '@nestjs/testing';
import { CargoManagementController } from './cargo-management.controller';
import { CargoManagementService } from './cargo-management.service';

describe('CargoManagementController', () => {
  let cargoManagementController: CargoManagementController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CargoManagementController],
      providers: [CargoManagementService],
    }).compile();

    cargoManagementController = app.get<CargoManagementController>(CargoManagementController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(cargoManagementController.getHello()).toBe('Hello World!');
    });
  });
});
