import { IsString, IsNumber } from 'class-validator';
import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';

@Entity({ name: 'ship' })
export class Ship extends BaseEntity {

  @IsString()
  @Column({ type: 'varchar', length: 300 })
  public name: string;

  @IsString()
  @Column({ type: 'varchar', length: 300 })
  public shippingCompany: string;

  @IsNumber()
  @Column('int')
  public grossTonnage: number;

  @IsNumber()
  @Column('int')
  public length: number;
}