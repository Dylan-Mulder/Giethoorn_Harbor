import { Module } from '@nestjs/common';
import { TrafficControlController } from './traffic_control.controller';
import { TrafficControlService } from './traffic_control.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';

// Entities
import { Dock } from './entities/dock.entity';
import { Passage } from './entities/passage.entity';
import { Ship } from './entities/ship.entity';
import { TrafficPlanning } from './entities/traffic-planning.entity';
import { Truck } from './entities/truck.entity';
import { Tugboat } from './entities/tugboat.entity';

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
        host: configService.get('host'),
        port: configService.get('port'),
        username: configService.get('username'),
        password: configService.get('password'),
        database: configService.get('database'),
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
