import { Module } from '@nestjs/common';
import { MessagingController } from './messaging.controller';
import { MessagingService } from './messaging.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { Invoice } from './entities/invoice.entity';

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
        entities: [Invoice],
        synchronize: false,
        migrationsRun: false
      }),
    })
  ],
  controllers: [MessagingController],
  providers: [MessagingService],
})
export class MessagingModule { }
