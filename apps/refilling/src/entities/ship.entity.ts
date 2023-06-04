import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ship', schema: 'refilling' })
export class Ship {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @Generated("uuid")
  public stream_id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  public name: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: Date;
}

