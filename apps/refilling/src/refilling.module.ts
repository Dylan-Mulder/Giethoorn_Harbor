import { Module } from '@nestjs/common';
import { RefillingController } from './refilling.controller';
import { RefillingService } from './refilling.service';

@Module({
  imports: [],
  controllers: [RefillingController],
  providers: [RefillingService],
})
export class RefillingModule {}
