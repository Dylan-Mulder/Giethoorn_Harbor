import { Module } from '@nestjs/common';
import { TrafficPlanningService } from './traffic-planning.service';
import { TrafficPlanningController } from './traffic-planning.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ITrafficPlanningService } from '../../interfaces/ITrafficPlanning.service';
import { TrafficPlanning } from './entities/traffic-planning.entity';

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
