import { Module } from '@nestjs/common';
import { PassageController } from './passage.controller';
import { PassageService } from './passage.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Passage } from './passage.model';

@Module({
  imports: [TypeOrmModule.forFeature([Passage])],
  providers: [PassageService],
  controllers: [PassageController],
})
export class PassageModule { }