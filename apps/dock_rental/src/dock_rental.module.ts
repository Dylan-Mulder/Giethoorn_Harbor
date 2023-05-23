import { Module } from '@nestjs/common';
import { DockRentalController } from './dock_rental.controller';
import { DockRentalService } from './dock_rental.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env'
    })
  ],
  controllers: [DockRentalController],
  providers: [DockRentalService],
})
export class DockRentalModule { }

