import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'water_quality_report', schema: 'publications' })
export class WaterQualityReport {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @Generated("uuid")
  public stream_id: string;

  @Column("int", { nullable: false })
  public ph: number;

  @Column("int", { nullable: false })
  public oxygen_in_mg_per_l: number;

  @Column("int", { nullable: false })
  public temperature_in_celsius: number;

  @Column("int", { nullable: false })
  public chlorine_in_mg_per_l: number;

  @Column({ type: 'timestamp', nullable: false })
  public start_date: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: Date;
}