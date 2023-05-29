import { Injectable } from '@nestjs/common';
import { IShipCompanyService } from '../../interfaces/IShipCompany.service';
import { DeleteResult } from 'typeorm';
import { ShippingCompany } from './shipping-company.entity';

@Injectable()
export class ShippingCompanyService implements IShipCompanyService {

  createShipCompany(shipCompany: ShippingCompany): Promise<ShippingCompany> {
    throw new Error('Method not implemented.');
  }

  getShipCompanyById(id: number): Promise<ShippingCompany> {
    throw new Error('Method not implemented.');
  }

  getAllShipCompanies(): Promise<ShippingCompany[]> {
    throw new Error('Method not implemented.');
  }

  updateShipCompanyById(id: number, updateShipCompany: ShippingCompany): Promise<ShippingCompany> {
    throw new Error('Method not implemented.');
  }

  deleteShipCompanyById(id: number): Promise<DeleteResult> {
    throw new Error('Method not implemented.');
  }

}
