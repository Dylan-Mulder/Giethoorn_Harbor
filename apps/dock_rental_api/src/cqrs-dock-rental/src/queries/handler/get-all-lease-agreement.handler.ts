import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GetAllLeaseQuery } from "../impl/get-lease-agreements.query";
import { LeaseAgreement } from "../../entities/lease-agreement.entity";

@QueryHandler(GetAllLeaseQuery)
export class GetAllLeaseHandler implements IQueryHandler<GetAllLeaseQuery>{

  constructor(@InjectRepository(LeaseAgreement) private readonly repo: Repository<LeaseAgreement>) { }

  async execute(query: GetAllLeaseQuery): Promise<Array<LeaseAgreement>> {
    return await this.repo.find();
  }
}