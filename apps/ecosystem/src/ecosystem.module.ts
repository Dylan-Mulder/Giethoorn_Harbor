import { Module } from '@nestjs/common';
import { EcosystemController } from './ecosystem.controller';
import { EcosystemService } from './ecosystem.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { MarineLifeReport } from './entities/marine-life-report.entity';
import { TrafficPlanning } from './entities/traffic-planning.entity';
import { WaterQualityReport } from './entities/water-quality-report.entity';

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
        entities: [MarineLifeReport, TrafficPlanning, WaterQualityReport],
        synchronize: false,
        migrationsRun: false
      }),
    })
  ],
  controllers: [EcosystemController],
  providers: [EcosystemService],
})
export class EcosystemModule { }
