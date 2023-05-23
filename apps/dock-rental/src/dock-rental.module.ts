import { Module } from '@nestjs/common';
import { DockRentalController } from './dock-rental.controller';
import { DockRentalService } from './dock-rental.service';

@Module({
  imports: [],
  controllers: [DockRentalController],
  providers: [DockRentalService],
})
export class DockRentalModule {}
