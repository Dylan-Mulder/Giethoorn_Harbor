import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'service', schema: 'cargo_management' })
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

  @Column("int", { nullable: false })
  public cargo_id: number;

  @Column({ nullable: false })
  public is_loading: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: Date;
}

