import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'shipping_company', schema: 'dock_rental' })
export class ShippingCompany {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  @Generated("uuid")
  public stream_id!: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  public reference: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  public name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  public country: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: Date;
}