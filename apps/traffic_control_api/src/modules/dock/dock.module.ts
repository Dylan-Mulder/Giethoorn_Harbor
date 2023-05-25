import { Module } from '@nestjs/common';
import { DockController } from './dock.controller';
import { DockService } from './dock.service';

@Module({
  controllers: [DockController],
  providers: [DockService]
})
export class DockModule {}
