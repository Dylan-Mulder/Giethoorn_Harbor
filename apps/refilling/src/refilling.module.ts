import { Module } from '@nestjs/common';
import { RefillingController } from './refilling.controller';
import { RefillingService } from './refilling.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './.env' }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => ({
    //     "type": "postgres",
    //     "host": "172.19.0.2",
    //     "port": 5432,
    //     "username": "postgres",
    //     "password": "password",
    //     "database": "postgres",
    //     //"entities": ["./**/*.model.ts"],
    //     "synchronize": true
    //   }),
    //   inject: [ConfigService]
    // }),
  ],
})
export class RefillingModule {}
