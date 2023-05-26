import { Module } from '@nestjs/common';
import { DockController } from './dock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dock } from './dock.model';
import { DockService } from './dock.service';

@Module({
  imports: [TypeOrmModule.forFeature([Dock])],
  providers: [DockService],
  controllers: [DockController],
  exports: [DockService]
})

export class DockModule {
  // public configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(AuthMiddleware)
  //     .forRoutes({ path: 'dock', method: RequestMethod.GET }, { path: 'dock', method: RequestMethod.PUT });
  // }
}
