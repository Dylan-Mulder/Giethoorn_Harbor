import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'event', schema: 'ecosystem' })
export class GHEvent {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'uuid', nullable: false })
  public stream_id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  public type: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  public body: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: Date;
}

