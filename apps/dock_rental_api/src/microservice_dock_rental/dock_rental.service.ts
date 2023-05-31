import { Injectable } from '@nestjs/common';
import amqp from 'amqp-connection-manager';
import { ConfigService } from '@nestjs/config';
import { Dock } from '../modules/dock/entities/dock.entity';
import { LeaseAgreement } from '../modules/lease-agreement/entities/lease-agreement.entity';
import { ShippingCompany } from '../modules/shipping-company/entity/shipping-company.entity';
import { Repository } from 'typeorm';
import { GHEvent } from '../config/datasources/gh-event';
import { getCQRSDataSource } from '../config/datasources/cqrs_datasource';

@Injectable()
export class DockRentalService {
  constructor(private readonly configService: ConfigService) {
    this.initDatasources();
  };

  // RabbitMQ
  private USER = this.configService.get('RABBITMQ_USER');
  private PASSWORD = this.configService.get('RABBITMQ_PASS');
  private HOST = this.configService.get('RABBITMQ_HOST');

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

  // CREATE 

  //EP-DR-01 Dock has been created
  async createDock(dockData: any): Promise<Dock> {
    //Naar CQRS-READ-DB
    let newDock = new Dock();
    newDock.name = dockData.name;
    this.dockRepo.create(newDock);
    const returnedObject = await this.dockRepo.save(newDock);
    await this.sendToQueue('dock-created', 'event.dock-created', JSON.stringify(returnedObject));
    return returnedObject
  }

  //EP-DR-02 Lease Agreement has been created
  async createLeaseAgreement(dockData: any, leaseAgreementData: any, shippingCompanyData: any): Promise<LeaseAgreement> {
    //Naar CQRS-READ-DB
    let newLease = new LeaseAgreement();
    newLease.reference = leaseAgreementData.reference;
    newLease.dock_id = dockData.dock_id;
    newLease.shipping_company_id = shippingCompanyData.shipping_company_id;
    newLease.sign_date = leaseAgreementData.sign_date;
    newLease.price = leaseAgreementData.price;
    this.shippingCompanyRepo.create(newLease);
    const returnedObject = await this.leaseAgreementRepo.save(newLease);
    await this.sendToQueue('lease-agreement-created', 'event.lease-agreement-created', JSON.stringify(returnedObject));
    return returnedObject
  }

  //EP-DR-03 Shipping Company has been created
  async createShippingCompany(shippingCompanyData: any): Promise<ShippingCompany> {
    //Naar CQRS-READ-DB
    let newCompany = new ShippingCompany();
    newCompany.reference = shippingCompanyData.reference;
    newCompany.name = shippingCompanyData.name;
    newCompany.country = shippingCompanyData.country;
    this.shippingCompanyRepo.create(newCompany);
    const returnedObject = await this.shippingCompanyRepo.save(newCompany);
    await this.sendToQueue('shipping-company-created', 'event.shipping-company-created', JSON.stringify(returnedObject));
    return returnedObject
  }

  // READ ALL

  //EP-DR-04 All Docks have been found
  async readAllDocks(): Promise<Array<Dock>> {
    return await this.dockRepo.find();
  }

  //EP-DR-06 All Lease Agreements have been found
  async readAllLeaseAgreements(): Promise<Array<LeaseAgreement>> {
    return await this.leaseAgreementRepo.find();
  }

  //EP-DR-08 All Shipping Companies have been found
  async readAllShippingCompanies(): Promise<Array<ShippingCompany>> {
    return await this.shippingCompanyRepo.find();
  }


  // READ SINGLE

  //EP-DR-05 Dock has been found
  async readSingleDock(id: number): Promise<Dock> {
    return await this.dockRepo.findOne({ where: { id: id } });
  }

  //EP-DR-07 Lease Agreement has been found
  async readSingleLeaseAgreement(id: number): Promise<LeaseAgreement> {
    return await this.leaseAgreementRepo.findOne({ where: { id: id } });
  }


  //EP-DR-09 Shipping Company has been found
  async readSingleShippingCompany(id: number): Promise<ShippingCompany> {
    return await this.shippingCompanyRepo.findOne({ where: { id: id } });
  }

  async sendToQueue(exchangeName: string, routingKey: string, message: string) {
    const connection = amqp.connect(`amqp://${this.USER}:${this.PASSWORD}@${this.HOST}`);
    const channel = connection.createChannel();
    await channel.assertExchange(exchangeName, 'topic', { durable: false });
    await channel.publish(exchangeName, routingKey, Buffer.from(message));
  };
}