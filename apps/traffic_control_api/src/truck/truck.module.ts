import { Module } from '@nestjs/common';
import { TruckController } from './truck.controller';
import { TruckService } from './truck.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Truck } from './truck.model';

@Module({
  imports: [TypeOrmModule.forFeature([Truck])],
  controllers: [TruckController],
  providers: [TruckService],
})
export class TruckModule { }
