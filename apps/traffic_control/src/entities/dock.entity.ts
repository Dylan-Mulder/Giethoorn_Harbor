import { Entity, Column, CreateDateColumn, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'dock', schema: 'traffic_control' })
export class Dock {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @Generated("uuid")
  public stream_id: string;

  @Column({ type: 'varchar', length: 300 })
  public name: string;

  @Column({ type: 'varchar', length: 300 })
  public description: string;

  @Column('int')
  public amountOfShipSpots: number;

  @Column('int')
  public amountOfTruckSpots: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: Date;
}