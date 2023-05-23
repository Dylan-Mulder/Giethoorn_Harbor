import { Test, TestingModule } from '@nestjs/testing';
import { PublicationsController } from './publications.controller';
import { PublicationsService } from './publications.service';

describe('PublicationsController', () => {
  let publicationsController: PublicationsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PublicationsController],
      providers: [PublicationsService],
    }).compile();

    publicationsController = app.get<PublicationsController>(PublicationsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(publicationsController.getHello()).toBe('Hello World!');
    });
  });
});
