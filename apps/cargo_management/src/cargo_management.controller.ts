import { Controller, Get } from '@nestjs/common';
import { CargoManagementService } from './cargo_management.service';

@Controller()
export class CargoManagementController {
  constructor(private readonly cargoManagementService: CargoManagementService) {}

  @Get()
  getHello(): string {
    return this.cargoManagementService.getHello();
  }
}
