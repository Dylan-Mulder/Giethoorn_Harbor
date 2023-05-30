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
export class ShippingCompanyModule {
  // public configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(AuthMiddleware)
  //     .forRoutes({ path: 'dock', method: RequestMethod.GET }, { path: 'dock', method: RequestMethod.PUT });
  // }
}
