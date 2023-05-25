import { Module } from '@nestjs/common';
import { ShipController } from './ship.controller';
import { ShipService } from './ship.service';

@Module({
  controllers: [ShipController],
  providers: [ShipService]
})
export class ShipModule {}
