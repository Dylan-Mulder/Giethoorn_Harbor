import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'inspection', schema: 'security' })
export class Inspection {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @Generated("uuid")
  public stream_id: string;

  @Column("int", { nullable: false })
  public traffic_planning_id: number;

  @Column("int", { nullable: true })
  public ship_id: number;

  @Column("int", { nullable: true })
  public truck_id: number;

  @Column({ type: 'varchar', length: 300, nullable: false })
  public supervisor: string;

  @Column({ type: 'timestamp', nullable: false })
  public scheduled_for: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: Date;
}

