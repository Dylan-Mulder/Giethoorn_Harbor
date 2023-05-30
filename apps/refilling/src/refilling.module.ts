import { Module } from '@nestjs/common';
import { RefillingController } from './refilling.controller';
import { RefillingService } from './refilling.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './.env' }),
  ],
})
export class RefillingModule {}
