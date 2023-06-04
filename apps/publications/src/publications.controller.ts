import { Controller, Get } from '@nestjs/common';
import { PublicationsService } from './publications.service';

@Controller()
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Get()
  getHello(): string {
    return this.publicationsService.getHello();
  }
}
