import { Module } from '@nestjs/common';
import { TugboatController } from './tugboat.controller';
import { TugboatService } from './tugboat.service';
import { Tugboat } from './tugboat.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Tugboat])],
  controllers: [TugboatController],
  providers: [TugboatService],
  // exports: [TugboatService]
})
export class TugboatModule { }
