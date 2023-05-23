import { Module } from '@nestjs/common';
import { CargoManagementController } from './cargo-management.controller';
import { CargoManagementService } from './cargo-management.service';

@Module({
  imports: [],
  controllers: [CargoManagementController],
  providers: [CargoManagementService],
})
export class CargoManagementModule {}
