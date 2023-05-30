import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ship_service', schema: 'billing' })
export class ShipService {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @Generated("uuid")
  public stream_id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  public reference: string;

  @Column("int", { nullable: false })
  public shipping_company_id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  public service_provided: string;

  @Column({ type: 'timestamp', nullable: false })
  public date: Date;

  @Column("int", { nullable: false })
  public price: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: Date;
}

