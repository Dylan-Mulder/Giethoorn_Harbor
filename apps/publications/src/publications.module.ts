import { Module } from '@nestjs/common';
import { PublicationsController } from './publications.controller';
import { PublicationsService } from './publications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';

// Entities
import { MarineLifeReport } from './entities/marine-life-report.entity';
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
        host: configService.get('host'),
        port: configService.get('port'),
        username: configService.get('username'),
        password: configService.get('password'),
        database: configService.get('database'),
        entities: [MarineLifeReport, WaterQualityReport],
        synchronize: false,
        migrationsRun: false
      }),
    })
  ],
  controllers: [PublicationsController],
  providers: [PublicationsService],
})
export class PublicationsModule { }
