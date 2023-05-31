import { IQuery } from "@nestjs/cqrs";

export class GetSingleLeaseQuery implements IQuery {
  constructor(public readonly id: number) { }
}