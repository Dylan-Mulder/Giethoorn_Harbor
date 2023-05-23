import { Test, TestingModule } from '@nestjs/testing';
import { SecurityController } from './security.controller';
import { SecurityService } from './security.service';

describe('SecurityController', () => {
  let securityController: SecurityController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SecurityController],
      providers: [SecurityService],
    }).compile();

    securityController = app.get<SecurityController>(SecurityController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(securityController.getHello()).toBe('Hello World!');
    });
  });
});
