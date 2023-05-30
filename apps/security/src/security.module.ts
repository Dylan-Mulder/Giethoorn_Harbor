import { Module } from '@nestjs/common';
import { SecurityController } from './security.controller';
import { SecurityService } from './security.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';

// Entities
import { Inspection } from './entities/inspection.entity';
import { Ship } from './entities/ship.entity';
import { TrafficPlanning } from './entities/traffic-planning.entity';
import { Truck } from './entities/truck.entity';

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
        entities: [Inspection, Ship, TrafficPlanning, Truck],
        synchronize: false,
        migrationsRun: false
      }),
    })
  ],
  controllers: [SecurityController],
  providers: [SecurityService],
})
export class SecurityModule { }
