import { Module } from '@nestjs/common';
import { TruckController } from './truck.controller';
import { TruckService } from './truck.service';

@Module({
  controllers: [TruckController],
  providers: [TruckService]
})
export class TruckModule {}
