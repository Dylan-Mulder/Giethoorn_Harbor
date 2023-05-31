import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';


import { LeaseAgreementService } from './cqrs-dock-rental.service';
import { CQRSLeaseAgreementController } from './cqrs-dock-rental.controller';
import { LeaseAgreement } from './entities/lease-agreement.entity';
import { GetSingleLeaseQuery } from './queries/impl/get-lease-agreement.query';
import { GetAllLeaseHandler } from './queries/handler/get-all-lease-agreement.handler';
import { GetSingleLeaseHandler } from './queries/handler/get-lease-agreements.handler';
import { CreateLeaseHandler } from './commands/handler/create-lease.handler';
import { DeleteLeaseHandler } from './commands/handler/delete-lease.handler';
import { UpdateLeaseHandler } from './commands/handler/update-lease.handler';
import { CreateLeaseAgreementCommand } from './commands/impl/create-lease-agreement.command';
import { UpdateLeaseAgreementCommand } from './commands/impl/update-lease-agreement.command';
import { DeleteLeaseAgreementCommand } from './commands/impl/delete-lease-agreement.command';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([LeaseAgreement])],
  controllers: [CQRSLeaseAgreementController],
  providers: [
    LeaseAgreementService,
    GetAllLeaseHandler,
    GetSingleLeaseQuery, GetSingleLeaseHandler,
    CreateLeaseAgreementCommand, CreateLeaseHandler,
    UpdateLeaseAgreementCommand, UpdateLeaseHandler,
    DeleteLeaseAgreementCommand, DeleteLeaseHandler,
  ]
})
export class CQRSLeaseAgreementModule { }