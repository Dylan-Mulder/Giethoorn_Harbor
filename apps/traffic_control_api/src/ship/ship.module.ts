import { Module } from '@nestjs/common';
import { ShipController } from './ship.controller';
import { ShipService } from './ship.service';
import { Ship } from 'apps/security/models/ship.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IShipService } from '../interfaces/IShipService';

@Module({
  imports: [TypeOrmModule.forFeature([Ship])],
  providers: [
    {
      provide: IShipService,
      useClass: ShipService
    }
  ],
  controllers: [ShipController],
})
export class ShipModule {
  // public configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(AuthMiddleware)
  //     .forRoutes({ path: 'dock', method: RequestMethod.GET }, { path: 'dock', method: RequestMethod.PUT });
  // }
}
