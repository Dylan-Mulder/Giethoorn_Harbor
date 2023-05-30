import { Module } from '@nestjs/common';
import { TrafficControlController } from './traffic_control.controller';
import { TrafficControlService } from './traffic_control.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';

// Entities
import { Dock } from '../../traffic_control_api/src/modules/dock/dock.entity';
import { Passage } from '../../traffic_control_api/src/modules/passage/passage.entity';
import { Ship } from '../../traffic_control_api/src/modules/ship/ship.entity';
import { TrafficPlanning } from '../../traffic_control_api/src/modules/traffic-planning/trafficPlanning.entity';
import { Truck } from '../../traffic_control_api/src/modules/truck/truck.entity';
import { Tugboat } from '../../traffic_control_api/src/modules/tugboat/tugboat.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [Dock, Passage, Ship, TrafficPlanning, Truck, Tugboat],
        synchronize: false,
        migrationsRun: false
      }),
    })
  ],
  controllers: [TrafficControlController],
  providers: [TrafficControlService],
})
export class TrafficControlModule { }
