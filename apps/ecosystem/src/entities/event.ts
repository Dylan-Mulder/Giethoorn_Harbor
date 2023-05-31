import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'event', schema: 'ecosystem' })
export class Event {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column("uuid", { nullable: false })
  public stream_id: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: Date;
}