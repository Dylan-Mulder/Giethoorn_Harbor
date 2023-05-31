import { Entity, Column, CreateDateColumn, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'passage', schema: 'traffic_control' })
export class Passage {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @Generated("uuid")
  public stream_id: string;

  @Column("int", { nullable: false })
  public dock_id: number;

  @Column("int", { nullable: true })
  public ship_id: number;

  @Column("int", { nullable: true })
  public truck_id: number;

  // @Column({ type: 'varchar', length: 300 })
  @Column('jsonb', { nullable: false, default: {} })
  public tugboats: string;

  @Column({ type: 'timestamp', nullable: false })
  public arrival: Date;

  @Column({ type: 'timestamp', nullable: false })
  public departure: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: Date;
}