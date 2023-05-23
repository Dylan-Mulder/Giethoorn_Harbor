import { Test, TestingModule } from '@nestjs/testing';
import { DockRentalController } from './dock-rental.controller';
import { DockRentalService } from './dock-rental.service';

describe('DockRentalController', () => {
  let dockRentalController: DockRentalController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DockRentalController],
      providers: [DockRentalService],
    }).compile();

    dockRentalController = app.get<DockRentalController>(DockRentalController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(dockRentalController.getHello()).toBe('Hello World!');
    });
  });
});
