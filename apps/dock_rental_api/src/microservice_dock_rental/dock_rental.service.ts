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
    const dock = new Dock();
    dock.name = dockData[0].name;
    await this.dockRepo.save(dock);
    console.log("Dock created at read database.");
  }

  //EP-DR-02 Lease Agreement has been created
  async createLeaseAgreement(leaseAgreementData: any): Promise<void>{
    const leaseAgreement = new LeaseAgreement();
    leaseAgreement.dock_id= leaseAgreementData[0].dock_id;
    leaseAgreement.shipping_company_id= leaseAgreementData[0].shipping_company_id;
    leaseAgreement.price=leaseAgreementData[0].price;
    leaseAgreement.reference=leaseAgreementData[0].reference;
    leaseAgreement.sign_date=new Date(leaseAgreementData[0].sign_date);
    leaseAgreement.valid_until=new Date(leaseAgreementData[0].valid_until);

    await this.leaseAgreementRepo.save(leaseAgreement);
    console.log("Lease Agreement created at read database.");
  }

  //EP-DR-02 Shipping Company has been created
  async createShippingCompany(leaseAgreementData: any): Promise<void>{
    const shippingCompany = new ShippingCompany();
    shippingCompany.country=leaseAgreementData[0].country;
    shippingCompany.name=leaseAgreementData[0].name;
    shippingCompany.reference=leaseAgreementData[0].reference;

    await this.shippingCompanyRepo.save(shippingCompany);
    console.log("Shipping company created at read database.");
}
  async sendToQueue(exchangeName: string, routingKey: string, message: string){
    const connection = await amqp.connect(`amqp://${this.USER}:${this.PASSWORD}@${this.HOST}`);
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, 'topic', { durable: false });
    await channel.publish(exchangeName, routingKey, Buffer.from(message));
  };
}
