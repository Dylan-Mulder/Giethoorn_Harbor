import { IsString } from 'class-validator';
import { BaseEntity } from '../../common/base.entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'truck' })
export class Truck extends BaseEntity {

  @IsString()
  @Column({ type: 'varchar', length: 300 })
  public name: string;

  @IsString()
  @Column({ type: 'varchar', length: 300 })
  public shippingCompany: string;
}