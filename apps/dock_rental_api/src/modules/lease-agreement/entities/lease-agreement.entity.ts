import { ShippingCompany } from '../../shipping-company/entity/shipping-company.entity';
import { Dock } from '../../dock/entities/dock.entity';
import { Column, Entity, Generated, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'lease_agreement', schema: 'dock_rental' })
export class LeaseAgreement {

  @PrimaryGeneratedColumn('increment', { type: "int" })
  public id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  @Generated('uuid')
  public stream_id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  public reference: string;

  @Column("int", { nullable: false })
  public dock_id: number;

  @Column("int", { nullable: false })
  public shipping_company_id: number;

  @Column({ type: 'timestamptz', nullable: false })
  public sign_date: Date;

  @Column({ type: 'timestamptz', nullable: false })
  public valid_until: Date;

  @Column("int", { nullable: false })
  public price: number;

  @Column({ type: 'timestamptz', nullable: false })
  public created_at: Date;
}