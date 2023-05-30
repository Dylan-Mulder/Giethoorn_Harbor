import { Controller, Get, Param, Post, Body, Delete, Put } from '@nestjs/common';
import { ShippingCompany } from './entity/shipping-company.entity';
import { IShipCompanyService } from '../../interfaces/IShipCompany.service';
import { ShippingCompanyDTO } from './dto/ship-company.dto';
import { UpdateResult, DeleteResult } from 'typeorm';

@Controller('shipping-companies')
export class ShippingCompanyController {
  constructor(private readonly shippingCompanyService: IShipCompanyService) { }

  @Post()
  public async createShippingCompany(@Body() leaseAgreement: ShippingCompanyDTO): Promise<ShippingCompanyDTO> {
    return await this.shippingCompanyService.createShipCompany(leaseAgreement);
  }

  @Get(':shippingCompanyId')
  public async getShippingCompanyById(@Param() param: { shippingCompanyId: number }): Promise<ShippingCompanyDTO> {
    return await this.shippingCompanyService.getShipCompanyById(param.shippingCompanyId);
  }

  @Get()
  public async getAllShippingCompanies(): Promise<Array<ShippingCompanyDTO>> {
    return await this.shippingCompanyService.getAllShipCompanies();
  }

  @Put(':shippingCompanyId/update')
  public async updateShippingCompanyById(@Param() param: { shippingCompanyId: number }, @Body() updateShippingCompany: ShippingCompanyDTO): Promise<UpdateResult> {
    return await this.shippingCompanyService.updateShipCompanyById(param.shippingCompanyId, updateShippingCompany);
  }

  @Delete(':shippingCompanyId/delete')
  public async deleteShippingCompanyById(@Param() param: { shippingCompanyId: number }): Promise<DeleteResult> {
    return await this.shippingCompanyService.deleteShipCompanyById(param.shippingCompanyId);
  }
}