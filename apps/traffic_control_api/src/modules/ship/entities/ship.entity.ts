import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'ship', schema: 'traffic_control' })
export class Ship {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @Generated('uuid')
  public stream_id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  public name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  public shipping_company_name: string;

  @Column('int', { nullable: false })
  public max_load_in_tonnage: number;

  @Column('int', { nullable: false })
  public length_in_m: number;

  @Column('bool', { nullable: false, default: false })
  public is_cleared: boolean;

  @Column('bool', { nullable: false, default: false })
  public is_denied: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: Date;
}
