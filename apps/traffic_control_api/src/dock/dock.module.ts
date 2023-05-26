import { DockController } from './dock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dock } from './dock.model';
import { DockService } from './dock.service';
import { Module } from '@nestjs/common';
import { IDockService } from '../interfaces/IDockService';

@Module({
  imports: [TypeOrmModule.forFeature([Dock])],
  providers: [
    {
      provide: IDockService,
      useClass: DockService
    }
  ],
  controllers: [DockController]
})

export class DockModule {
  // public configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(AuthMiddleware)
  //     .forRoutes({ path: 'dock', method: RequestMethod.GET }, { path: 'dock', method: RequestMethod.PUT });
  // }
}
