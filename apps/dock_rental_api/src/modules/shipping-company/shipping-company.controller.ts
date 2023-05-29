import { Controller, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { ShippingCompany } from './shipping-company.entity';
import { IShipCompanyService } from '../../interfaces/IShipCompany.service';

@Controller('shipping-company')
export class ShippingCompanyController {
  constructor(private readonly shippingCompanyService: IShipCompanyService) { }

  @Post()
  async createShippingCompany(@Body() leaseAgreement: ShippingCompany) {
    return await this.shippingCompanyService.createShipCompany(leaseAgreement);
  }

  @Get()
  async getShippingCompanyById(@Param() param: { shippingCompanyId: number }) {
    return await this.shippingCompanyService.getShipCompanyById(param.shippingCompanyId);
  }

  @Get()
  async getAllShippingCompanies() {
    return await this.shippingCompanyService.getAllShipCompanies();
  }

  @Patch()
  async updateShippingCompanyById(@Param() param: { shippingCompanyId: number }, @Body() updateShippingCompany: ShippingCompany) {
    return await this.shippingCompanyService.updateShipCompanyById(param.shippingCompanyId, updateShippingCompany);
  }

  @Delete()
  async deleteShippingCompanyById(@Param() param: { shippingCompanyId: number }) {
    return await this.shippingCompanyService.deleteShipCompanyById(param.shippingCompanyId);
  }
}