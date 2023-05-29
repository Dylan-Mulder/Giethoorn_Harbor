import { ShippingCompany } from '../../shipping-company/entity/shipping-company.entity';
import { Dock } from '../../dock/entities/dock.entity';
import { Column, Entity, Generated, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'lease_agreement' })
export class LeaseAgreement {

  @PrimaryGeneratedColumn('increment', { type: "int" })
  public id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  @Generated('uuid')
  public stream_id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  public reference: string;

  @OneToOne(() => Dock)
  @JoinColumn()
  public dock: Dock;

  @OneToOne(() => ShippingCompany)
  @JoinColumn()
  public shippingCompany: ShippingCompany;

  @Column({ type: 'timestamptz' })
  public signDate: Date;

  @Column({ type: 'timestamptz' })
  public validUntil: Date;

  @Column("int", { nullable: false })
  public price: number;

  @Column({ type: 'timestamptz', nullable: false })
  public created_at: Date;
}