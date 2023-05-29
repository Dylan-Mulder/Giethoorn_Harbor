import { IsNumber, IsString } from 'class-validator';
import { BaseEntity } from '../../common/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'shippingCompany' })
export class ShippingCompany extends BaseEntity {

  @IsString()
  @Column({ type: 'varchar', length: 300 })
  public name: string;

  @IsNumber()
  @Column("int")
  public kvkNumber: number;

  @IsString()
  @Column({ type: 'varchar', length: 100 })
  public country: string;
}