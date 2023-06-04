import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { Invoice } from './entities/invoice.entity';
import { LeaseAgreement } from './entities/lease-agreement.entity';
import { ShipService } from './entities/ship-service.entity';
import { ShippingCompany } from './entities/shipping-company.entity';

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
        entities: [Invoice, LeaseAgreement, ShipService, ShippingCompany],
        synchronize: false,
        migrationsRun: false
      }),
    })
  ],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule { }
