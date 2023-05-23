import { Module } from '@nestjs/common';
import { RefillingController } from './refilling.controller';
import { RefillingService } from './refilling.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env'
    })
  ],
  controllers: [RefillingController],
  providers: [RefillingService],
})
export class RefillingModule { }
