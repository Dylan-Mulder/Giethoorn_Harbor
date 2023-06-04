import { Module } from '@nestjs/common';
import { ShippingCompanyController } from './shipping-company.controller';
import { ShippingCompanyService } from './shipping-company.service';
import { IShipCompanyService } from '../../interfaces/IShipCompany.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingCompany } from './entity/shipping-company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShippingCompany])],
  providers: [
    {
      provide: IShipCompanyService,
      useClass: ShippingCompanyService
    }
  ],
  controllers: [ShippingCompanyController]
})
export class ShippingCompanyModule { }
