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
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
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
