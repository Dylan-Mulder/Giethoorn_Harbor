import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'service', schema: 'refilling' })
export class Service {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @Generated("uuid")
  public stream_id: string;

  @Column("int", { nullable: false })
  public traffic_planning_id: number;

  @Column("int", { nullable: false })
  public ship_id: number;

  @Column({ nullable: false, default: false })
  public needs_refuelling: boolean;

  @Column({ nullable: false, default: false })
  public needs_recharging: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: Date;
}

