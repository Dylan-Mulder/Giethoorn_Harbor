import { Module } from '@nestjs/common';
import { CargoManagementController } from './cargo_management.controller';
import { CargoManagementService } from './cargo_management.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { Cargo } from './entities/cargo.entity';
import { Service } from './entities/service.entity';
import { Ship } from './entities/ship.entity';
import { TrafficPlanning } from './entities/traffic-planning.entity';

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
        entities: [Cargo, Service, Ship, TrafficPlanning],
        synchronize: false,
        migrationsRun: false
      }),
    })
  ],
  controllers: [CargoManagementController],
  providers: [CargoManagementService],
})
export class CargoManagementModule { }
