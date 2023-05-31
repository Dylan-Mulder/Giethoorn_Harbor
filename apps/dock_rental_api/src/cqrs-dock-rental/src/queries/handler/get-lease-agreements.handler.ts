import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LeaseAgreement } from "../../entities/lease-agreement.entity";
import { GetSingleLeaseQuery } from "../impl/get-lease-agreement.query";

@QueryHandler(GetSingleLeaseQuery)
export class GetSingleLeaseHandler implements IQueryHandler<GetSingleLeaseQuery>{

  constructor(@InjectRepository(LeaseAgreement) private readonly repo: Repository<LeaseAgreement>) { }

  async execute(query: GetSingleLeaseQuery): Promise<LeaseAgreement> {
    return await this.repo.findOne({ where: { id: query.id } });
  }
}