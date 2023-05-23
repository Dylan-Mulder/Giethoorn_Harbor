import { Module } from '@nestjs/common';
import { PublicationsController } from './publications.controller';
import { PublicationsService } from './publications.service';

@Module({
  imports: [],
  controllers: [PublicationsController],
  providers: [PublicationsService],
})
export class PublicationsModule {}
