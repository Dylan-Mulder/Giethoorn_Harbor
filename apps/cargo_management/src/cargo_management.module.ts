import { Module } from '@nestjs/common';
import { CargoManagementController } from './cargo_management.controller';
import { CargoManagementService } from './cargo_management.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env'
    })
  ],
  controllers: [CargoManagementController],
  providers: [CargoManagementService],
})
export class CargoManagementModule { }
