import { Module } from '@nestjs/common';
import { TruckController } from './truck.controller';
import { TruckService } from './truck.service';

@Module({
  controllers: [TruckController],
  exports: [TruckService]
})
export class TruckModule { }
