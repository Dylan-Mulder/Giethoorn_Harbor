import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IShipCompanyService } from '../../interfaces/IShipCompany.service';
import { ShippingCompanyDTO } from './dto/ship-company.dto';
import { CreateShippingCompanyDTO } from './dto/create-shipping-company.dto';
import { ShippingCompany } from './entity/shipping-company.entity';


@Injectable()
export class ShippingCompanyService implements IShipCompanyService {

  constructor(@InjectRepository(ShippingCompany) private readonly repo: Repository<ShippingCompany>) { }

  public async getShipCompanyById(id: number): Promise<ShippingCompanyDTO> {
    return ShippingCompanyDTO.fromEntity(await this.repo.findOne({ where: { id: id } }));
  }

  public async getAllShipCompanies(): Promise<Array<ShippingCompanyDTO>> {
    return await this.repo.find().then((docks: Array<ShippingCompany>) => docks.map(d => ShippingCompanyDTO.fromEntity(d)));
  }

  public async createShipCompany(dto: CreateShippingCompanyDTO): Promise<ShippingCompany> {
    const shipCompany = this.repo.create(dto);
    return await this.repo.save(shipCompany);
  }

  public async updateShipCompanyById(id: number, updateShipCompany: CreateShippingCompanyDTO): Promise<ShippingCompany> {
    await this.repo.update(id, updateShipCompany)
    return await this.getShipCompanyById(id);
  }

  public async deleteShipCompanyById(id: number): Promise<ShippingCompany> {
    const obj = await this.getShipCompanyById(id);
    await this.repo.delete(id)
    return obj;
  }
}
