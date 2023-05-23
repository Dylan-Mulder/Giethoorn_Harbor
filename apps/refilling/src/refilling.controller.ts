import { Controller, Get } from '@nestjs/common';
import { RefillingService } from './refilling.service';

@Controller()
export class RefillingController {
  constructor(private readonly refillingService: RefillingService) {}

  @Get()
  getHello(): string {
    return this.refillingService.getHello();
  }
}
