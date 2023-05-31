import { Injectable } from '@nestjs/common';
import amqp from 'amqp-connection-manager';
import { ConfigService } from '@nestjs/config';
import { Dock } from '../modules/dock/entities/dock.entity';
import { LeaseAgreement } from '../modules/lease-agreement/entities/lease-agreement.entity';
import { ShippingCompany } from '../modules/shipping-company/entity/shipping-company.entity';
import { Repository } from 'typeorm';
import { GHEvent } from '../config/datasources/gh-event';
import { getCQRSDataSource } from '../config/datasources/cqrs_datasource';
//import { getRelationalDataSource } from '../config/datasources/relational_datasource';

@Injectable()
export class DockRentalService {
  constructor(private readonly configService: ConfigService){
    this.initDatasources();
  };

  // RabbitMQ
  private  USER = this.configService.get('RABBITMQ_USER');
  private  PASSWORD = this.configService.get('RABBITMQ_PASS');
  private  HOST = this.configService.get('RABBITMQ_HOST');

  // Repo's
  private dockRepo: Repository<Dock>;
  private leaseAgreementRepo: Repository<LeaseAgreement>;
  private shippingCompanyRepo: Repository<ShippingCompany>;

  async initDatasources() {
    // Init Datasources
    const cqrsDatasource = await getCQRSDataSource();
    // Init Repo's
    this.dockRepo = cqrsDatasource.getRepository(Dock);
    this.leaseAgreementRepo = cqrsDatasource.getRepository(LeaseAgreement);
    this.shippingCompanyRepo = cqrsDatasource.getRepository(ShippingCompany);
  }

  //EP-DR-01 Dock has been created
  async createDock(dockData:any): Promise<void>{
  //Naar CQRS-READ-DB
  }

  //EP-DR-02 Lease Agreement has been created
  async createLeaseAgreement(dockData:any, leaseAgreementData: any, shippingCompanyData: any): Promise<void>{
    //Naar CQRS-READ-DB
  }

  async sendToQueue(exchangeName: string, routingKey: string, message: string){
    const connection = await amqp.connect(`amqp://${this.USER}:${this.PASSWORD}@${this.HOST}`);
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, 'topic', { durable: false });
    await channel.publish(exchangeName, routingKey, Buffer.from(message));
  };
}
