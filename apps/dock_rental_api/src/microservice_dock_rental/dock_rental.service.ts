import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Dock } from '../modules/dock/entities/dock.entity';
import { LeaseAgreement } from '../modules/lease-agreement/entities/lease-agreement.entity';
import { ShippingCompany } from '../modules/shipping-company/entity/shipping-company.entity';
import { Repository } from 'typeorm';
import { GHEvent } from '../config/datasources/gh-event';
import { getCQRSDataSource } from '../config/datasources/cqrs_datasource';

@Injectable()
export class DockRentalService {
  constructor() {
    this.initDatasources();
  };


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
  async createShippingCompany(shippingCompanyData: any): Promise<void>{
    const shippingCompany = new ShippingCompany();
    shippingCompany.country=shippingCompanyData[0].country;
    shippingCompany.name=shippingCompanyData[0].name;
    shippingCompany.reference=shippingCompanyData[0].reference;

    await this.shippingCompanyRepo.save(shippingCompany);
    console.log("Shipping company created at read database.");
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
}
