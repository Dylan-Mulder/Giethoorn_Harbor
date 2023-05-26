import { Module } from '@nestjs/common';
import { ShipController } from './ship.controller';
import { ShipService } from './ship.service';
import { Ship } from 'apps/security/models/ship.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Ship])],
  controllers: [ShipController],
  providers: [ShipService],
  // exports: [ShipService]
})
export class ShipModule { }
