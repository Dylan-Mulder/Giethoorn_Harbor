import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'cargo', schema: 'cargo_management' })
export class Cargo {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @Generated("uuid")
  public stream_id: string;

  @Column("int", { nullable: false })
  public ship_id: number;

  @Column("int", { nullable: false })
  public amount_of_containers: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  public type: string;

  @Column("int", { nullable: false })
  public gross_tonnage: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: Date;
}

