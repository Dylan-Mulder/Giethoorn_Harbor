import { IsNumber, IsDate, IsObject } from 'class-validator';
import { ShippingCompany } from '../shipping-company/shipping-company.entity';
import { Dock } from '../dock/dock.entity';
import { BaseEntity } from '../../common/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity({ name: 'leaseAgreement' })
export class LeaseAgreement extends BaseEntity {

  @IsObject()
  @OneToOne(() => Dock)
  @JoinColumn()
  public dock: Dock;

  @IsObject()
  @OneToOne(() => ShippingCompany)
  @JoinColumn()
  public shippingCompany: ShippingCompany;

  @IsNumber()
  @Column("int")
  public uuid: number;

  @IsDate()
  @Column({ type: 'timestamptz' })
  public signDate: Date;

  @IsDate()
  @Column({ type: 'timestamptz' })
  public validUntil: Date;

  @IsNumber()
  @Column("int")
  public price: number;
}