import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'marine_life_report', schema: 'publications' })
export class MarineLifeReport {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @Generated("uuid")
  public stream_id: string;

  @Column("int", { nullable: false })
  public year: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  public species: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  public scientific_name: string;

  @Column("int", { nullable: false })
  public cpue: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: Date;
}