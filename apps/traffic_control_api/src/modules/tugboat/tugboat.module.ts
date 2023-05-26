import { Module } from '@nestjs/common';
import { TugboatController } from './tugboat.controller';
import { TugboatService } from './tugboat.service';

@Module({
  controllers: [TugboatController],
  exports: [TugboatService]
})
export class TugboatModule { }
