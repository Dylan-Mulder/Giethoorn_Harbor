import { IsObject, IsArray, IsDate } from 'class-validator';
import { Dock } from '../dock/dock.entity';
import { Ship } from '../ship/ship.entity';
import { Truck } from '../truck/truck.entity';
import { Tugboat } from '../tugboat/tugboat.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';

@Entity({ name: 'passage' })
export class Passage extends BaseEntity {

  @IsObject()
  @OneToOne(() => Dock)
  @JoinColumn()
  public ship: Ship;

  @IsObject()
  @OneToOne(() => Dock)
  @JoinColumn()
  public truck: Truck;

  @IsObject()
  @OneToOne(() => Dock)
  @JoinColumn()
  public dock: Dock;

  @IsArray()
  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
    nullable: false
  })
  public tugboats: Array<{ id: Tugboat['id'] }>;

  @IsDate()
  @Column({ type: 'timestamp' })
  public arrival: Date;

  @IsDate()
  @Column({ type: 'timestamp' })
  public departure: Date;
}