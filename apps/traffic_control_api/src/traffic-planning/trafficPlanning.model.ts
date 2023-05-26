import { IsArray, IsNumber, IsDate } from 'class-validator';
import { Passage } from '../passage/passage.model';

export class TrafficPlanning {

  @IsNumber()
  public id: number;

  @IsArray()
  public passages: Array<Passage>;

  @IsDate()
  public startDate: Date;

  @IsDate()
  public endDate: Date;
}
