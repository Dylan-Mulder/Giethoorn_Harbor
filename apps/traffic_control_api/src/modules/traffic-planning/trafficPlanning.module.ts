import { Module } from '@nestjs/common';
import { TrafficPlanningService } from './trafficPlanning.service';
import { TrafficPlanningController } from './trafficPlanning.controller';
import { TrafficPlanning } from './trafficPlanning.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ITrafficPlanningService } from '../../interfaces/ITrafficPlanning.service';

@Module({
  imports: [TypeOrmModule.forFeature([TrafficPlanning])],
  providers: [
    {
      provide: ITrafficPlanningService,
      useClass: TrafficPlanningService
    }
  ],
  controllers: [TrafficPlanningController],
})
export class TrafficPlanningModule {
  // public configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(AuthMiddleware)
  //     .forRoutes({ path: 'dock', method: RequestMethod.GET }, { path: 'dock', method: RequestMethod.PUT });
  // }
}
