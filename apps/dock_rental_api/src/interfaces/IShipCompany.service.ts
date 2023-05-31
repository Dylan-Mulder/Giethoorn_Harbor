import { CreateShippingCompanyDTO } from "../modules/shipping-company/dto/create-shipping-company.dto";
import { ShippingCompany } from "../modules/shipping-company/entity/shipping-company.entity";

export abstract class IShipCompanyService {
  abstract createShipCompany(dto: CreateShippingCompanyDTO): Promise<ShippingCompany>;
  abstract getShipCompanyById(id: number): Promise<ShippingCompany>;
  abstract getAllShipCompanies(): Promise<Array<ShippingCompany>>;
  abstract updateShipCompanyById(id: number, dto: CreateShippingCompanyDTO): Promise<ShippingCompany>;
  abstract deleteShipCompanyById(id: number): Promise<ShippingCompany>;
}