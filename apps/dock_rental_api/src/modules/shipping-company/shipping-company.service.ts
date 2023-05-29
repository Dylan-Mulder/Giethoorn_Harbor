import { Injectable } from '@nestjs/common';
import { IShipCompanyService } from '../../interfaces/IShipCompany.service';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ShippingCompany } from './entity/shipping-company.entity';
import { ShippingCompanyDTO } from './dto/ship-company.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ShippingCompanyService implements IShipCompanyService {

  constructor(@InjectRepository(ShippingCompany) private readonly repo: Repository<ShippingCompany>) { }

  public async getShipCompanyById(id: number): Promise<ShippingCompanyDTO> {
    return ShippingCompanyDTO.fromEntity(await this.repo.findOne({ where: { id: id } }));
  }

  public async getAllShipCompanies(): Promise<Array<ShippingCompanyDTO>> {
    return await this.repo.find().then((docks: Array<ShippingCompany>) => docks.map(d => ShippingCompanyDTO.fromEntity(d)));
  }

  public async createShipCompany(dto: ShippingCompanyDTO): Promise<ShippingCompanyDTO> {
    return await this.repo.save(dto.toEntity()).then((d: ShippingCompany) => ShippingCompanyDTO.fromEntity(d));
  }

  public async updateShipCompanyById(id: number, updateShipCompany: ShippingCompanyDTO): Promise<UpdateResult> {
    return await this.repo.update(id, updateShipCompany)
  }

  public async deleteShipCompanyById(id: number): Promise<DeleteResult> {
    return await this.repo.delete(id)
  }

}
