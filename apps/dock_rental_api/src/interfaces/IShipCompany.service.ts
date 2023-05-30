import { DeleteResult, UpdateResult } from "typeorm";
import { ShippingCompany } from "../modules/shipping-company/entity/shipping-company.entity";
import { ShippingCompanyDTO } from "../modules/shipping-company/dto/ship-company.dto";

export abstract class IShipCompanyService {
  abstract createShipCompany(shipCompany: ShippingCompanyDTO): Promise<ShippingCompanyDTO>;
  abstract getShipCompanyById(id: number): Promise<ShippingCompanyDTO>;
  abstract getAllShipCompanies(): Promise<Array<ShippingCompanyDTO>>;
  abstract updateShipCompanyById(id: number, updateShipCompany: ShippingCompanyDTO): Promise<UpdateResult>;
  abstract deleteShipCompanyById(id: number): Promise<DeleteResult>;
}