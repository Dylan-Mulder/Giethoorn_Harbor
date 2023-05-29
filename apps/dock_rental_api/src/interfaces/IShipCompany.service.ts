import { DeleteResult } from "typeorm";
import { ShippingCompany } from "../modules/shipping-company/shipping-company.entity";

export abstract class IShipCompanyService {
  abstract createShipCompany(shipCompany: ShippingCompany): Promise<ShippingCompany>;
  abstract getShipCompanyById(id: number): Promise<ShippingCompany>;
  abstract getAllShipCompanies(): Promise<Array<ShippingCompany>>;
  abstract updateShipCompanyById(id: number, updateShipCompany: ShippingCompany): Promise<ShippingCompany>;
  abstract deleteShipCompanyById(id: number): Promise<DeleteResult>;
}