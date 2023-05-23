import { Test, TestingModule } from '@nestjs/testing';
import { RefillingController } from './refilling.controller';
import { RefillingService } from './refilling.service';

describe('RefillingController', () => {
  let refillingController: RefillingController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RefillingController],
      providers: [RefillingService],
    }).compile();

    refillingController = app.get<RefillingController>(RefillingController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(refillingController.getHello()).toBe('Hello World!');
    });
  });
});
