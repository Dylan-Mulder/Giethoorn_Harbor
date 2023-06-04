import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'invoice', schema: 'billing' })
export class Invoice {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @Generated("uuid")
  public stream_id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  public reference: string;

  @Column("int", { nullable: false })
  public shipping_company_id: number;

  @Column({ type: 'varchar', length: 300, nullable: false })
  public records: string;

  @Column({ type: 'timestamp', nullable: false })
  public start_date: Date;

  @Column({ type: 'timestamp', nullable: false })
  public end_date: Date;

  @Column("int", { nullable: false })
  public total_price: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: Date;
}

