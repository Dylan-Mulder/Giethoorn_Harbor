import { Module } from '@nestjs/common';
import { PassageController } from './passage.controller';
import { PassageService } from './passage.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Passage } from './passage.model';
import { IPassageService } from '../interfaces/IPassageService';

@Module({
  imports: [TypeOrmModule.forFeature([Passage])],
  providers: [{
    provide: IPassageService,
    useClass: PassageService
  }],
  controllers: [PassageController],
})
export class PassageModule { }