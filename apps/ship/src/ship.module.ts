import { Module } from '@nestjs/common';
import { ShipController } from './ship.controller';
import { ShipService } from './ship.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env'
    })
  ],
  controllers: [ShipController],
  providers: [ShipService],
})
export class ShipModule { }
