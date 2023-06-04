import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ILeaseAgreementService } from '../../interfaces/ILeaseAgreement.service';
import { LeaseAgreementService } from './lease-agreement.service';
import { LeaseAgreementController } from './lease-agreement.controller';
import { LeaseAgreement } from './entities/lease-agreement.entity';

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

export class LeaseAgreementModule { }
