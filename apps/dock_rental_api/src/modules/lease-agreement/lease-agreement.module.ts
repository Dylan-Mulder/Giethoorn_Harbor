import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ILeaseAgreementService } from '../../interfaces/ILeaseAgreement.service';
import { LeaseAgreementService } from './lease-agreement.service';
import { LeaseAgreementController } from './lease-agreement.controller';
import { LeaseAgreement } from './lease-agreement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LeaseAgreement])],
  providers: [
    {
      provide: ILeaseAgreementService,
      useClass: LeaseAgreementService
    }
  ],
  controllers: [LeaseAgreementController]
})

export class LeaseAgreementModule {
  // public configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(AuthMiddleware)
  //     .forRoutes({ path: 'dock', method: RequestMethod.GET }, { path: 'dock', method: RequestMethod.PUT });
  // }
}
