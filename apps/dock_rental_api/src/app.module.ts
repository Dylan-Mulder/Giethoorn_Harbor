import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { DockModule } from './modules/dock/dock.module';
import { LeaseAgreementModule } from './modules/lease-agreement/lease-agreement.module';
import { ShippingCompanyModule } from './modules/shipping-company/shipping-company.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dock } from './modules/dock/entities/dock.entity';
import { LeaseAgreement } from './modules/lease-agreement/entities/lease-agreement.entity';
import { ShippingCompany } from './modules/shipping-company/entity/shipping-company.entity';
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
        entities: [Dock, LeaseAgreement, ShippingCompany],
        synchronize: false,
        migrationsRun: false
      }),
    }),
    LeaseAgreementModule,
    DockModule,
    ShippingCompanyModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'DOCK_RENTAL_SERVICE',
      useFactory: (configService: ConfigService) => {
        const USER = configService.get('RABBITMQ_USER');
        const PASSWORD = configService.get('RABBITMQ_PASSWORD');
        const HOST = configService.get('RABBITMQ_HOST');
        const QUEUE = configService.get('RABBITMQ_DOCK_RENTAL_QUEUE');

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
            queue: QUEUE,
            queueOptions: {
              durable: true
            }
          }
        })
      },
      inject: [ConfigService]
    },
    {
      provide: 'BILLING_SERVICE',
      useFactory: (configService: ConfigService) => {
        const USER = configService.get('RABBITMQ_USER');
        const PASSWORD = configService.get('RABBITMQ_PASSWORD');
        const HOST = configService.get('RABBITMQ_HOST');
        const QUEUE = configService.get('RABBITMQ_BILLING_QUEUE');

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
            queue: QUEUE,
            queueOptions: {
              durable: true
            }
          }
        })
      },
      inject: [ConfigService]
    }
  ],
})
export class AppModule { }