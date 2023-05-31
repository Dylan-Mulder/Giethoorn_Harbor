import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'traffic_planning', schema: 'ecosystem' })
export class TrafficPlanning {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @Generated("uuid")
  public stream_id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  public passages: string;

  @Column({ type: 'timestamp', nullable: false })
  public start_date: Date;

  @Column({ type: 'timestamp', nullable: false })
  public end_date: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: Date;
}

