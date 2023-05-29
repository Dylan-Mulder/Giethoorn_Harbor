import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'shipping_company', schema: 'dock_rental' })
export class ShippingCompany {

  @PrimaryGeneratedColumn('increment', { type: "int" })
  public id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  @Generated('uuid')
  public stream_id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  public reference: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  public name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  public country: string;

  @Column({ type: 'timestamptz', nullable: false })
  public created_at: Date;
}