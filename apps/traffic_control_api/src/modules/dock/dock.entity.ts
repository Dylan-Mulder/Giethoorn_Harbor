import { IsString, IsNumber } from 'class-validator';
import { BaseEntity } from '../../common/base.entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'dock' })
export class Dock extends BaseEntity {

  @IsString()
  @Column({ type: 'varchar', length: 300 })
  public name: string;

  @IsString()
  @Column({ type: 'varchar', length: 300 })
  public description: string;

  @IsNumber()
  @Column('int')
  public amountOfShipSpots: number;

  @IsNumber()
  @Column('int')
  public amountOfTruckSpots: number;
}