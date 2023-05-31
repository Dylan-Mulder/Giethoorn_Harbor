import { Controller, Get, Param, Post, Body, Delete, Put } from '@nestjs/common';
import { ShippingCompany } from './entity/shipping-company.entity';
import { IShipCompanyService } from '../../interfaces/IShipCompany.service';
import { CreateShippingCompanyDTO } from './dto/create-shipping-company.dto';


@Controller('shipping-companies')
export class ShippingCompanyController {
  constructor(private readonly shippingCompanyService: IShipCompanyService) { }

  @Post()
  public async createShippingCompany(@Body() shipCompanyDTO: CreateShippingCompanyDTO): Promise<ShippingCompany> {
    return await this.shippingCompanyService.createShipCompany(shipCompanyDTO);
  }

  @Get(':shippingCompanyId')
  public async getShippingCompanyById(@Param() param: { shippingCompanyId: number }): Promise<ShippingCompany> {
    return await this.shippingCompanyService.getShipCompanyById(param.shippingCompanyId);
  }

  @Get()
  public async getAllShippingCompanies(): Promise<Array<ShippingCompany>> {
    return await this.shippingCompanyService.getAllShipCompanies();
  }

  @Put(':shippingCompanyId/update')
  public async updateShippingCompanyById(@Param() param: { shippingCompanyId: number }, @Body() updateShippingCompany: CreateShippingCompanyDTO): Promise<ShippingCompany> {
    return await this.shippingCompanyService.updateShipCompanyById(param.shippingCompanyId, updateShippingCompany);
  }

  @Delete(':shippingCompanyId/delete')
  public async deleteShippingCompanyById(@Param() param: { shippingCompanyId: number }): Promise<ShippingCompany> {
    return await this.shippingCompanyService.deleteShipCompanyById(param.shippingCompanyId);
  }
}