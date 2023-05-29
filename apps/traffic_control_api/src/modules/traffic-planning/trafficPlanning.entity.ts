import { IsArray, IsDate } from 'class-validator';
import { Passage } from '../passage/passage.entity';
import { BaseEntity } from '../../common/base.entity';
import { Column } from 'typeorm';

export class TrafficPlanning extends BaseEntity {

  @IsArray()
  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
    nullable: false
  })
  public passages: Array<{ id: Passage['id'] }>;

  @IsDate()
  @Column({ type: 'timestamptz' })
  public startDate: Date;

  @IsDate()
  @Column({ type: 'timestamptz' })
  public endDate: Date;
}
