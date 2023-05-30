import { Module } from '@nestjs/common';
import { TruckController } from './truck.controller';
import { TruckService } from './truck.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ITruckService } from '../../interfaces/ITruck.service';
import { Truck } from './entities/truck.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Truck])],
  providers: [
    {
      provide: ITruckService,
      useClass: TruckService
    }
  ],
  controllers: [TruckController]
})
export class TruckModule {
  // public configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(AuthMiddleware)
  //     .forRoutes({ path: 'dock', method: RequestMethod.GET }, { path: 'dock', method: RequestMethod.PUT });
  // }
}
