import { Controller, Get } from '@nestjs/common';
import { SecurityService } from './security.service';

@Controller()
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @Get()
  getHello(): string {
    return this.securityService.getHello();
  }
}
