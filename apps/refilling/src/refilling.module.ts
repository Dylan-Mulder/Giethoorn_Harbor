import { Module } from '@nestjs/common';
import { RefillingController } from './refilling.controller';
import { RefillingService } from './refilling.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';

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
        entities: configService.get('entities'),
        synchronize: configService.get('synchronize'),
        migrationsRun: configService.get('migrationsRun')
      }),
    })
  ],
  controllers: [RefillingController],
  providers: [RefillingService],
})
export class RefillingModule {}
