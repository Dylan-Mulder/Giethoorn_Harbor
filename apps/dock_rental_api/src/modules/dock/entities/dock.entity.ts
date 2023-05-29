import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'dock' })
export class Dock {
  @PrimaryGeneratedColumn('increment', { type: "int" })
  public id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  @Generated('uuid')
  public stream_id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  public name: string;

  @Column({ type: 'timestamptz', nullable: false })
  public created_at: Date;
}





