import { Module } from '@nestjs/common';
import { PassageController } from './passage.controller';
import { PassageService } from './passage.service';

@Module({
  controllers: [PassageController],
  providers: [PassageService]
})
export class PassageModule {}
