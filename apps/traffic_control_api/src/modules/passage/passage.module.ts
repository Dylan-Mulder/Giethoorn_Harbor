import { Module } from '@nestjs/common';
import { PassageController } from './passage.controller';
import { PassageService } from './passage.service';

@Module({
  controllers: [PassageController],
  exports: [PassageService]
})
export class PassageModule { }
