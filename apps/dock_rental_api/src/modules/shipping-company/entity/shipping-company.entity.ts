import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'shippingCompany' })
export class ShippingCompany {

  @PrimaryGeneratedColumn('increment', { type: "int" })
  public id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  @Generated('uuid')
  public stream_id: string;

  @Column({ type: 'varchar', length: 100 })
  public reference: string;

  @Column({ type: 'varchar', length: 100 })
  public name: string;

  @Column({ type: 'varchar', length: 100 })
  public country: string;

  @Column({ type: 'timestamptz', nullable: false })
  public created_at: Date;
}