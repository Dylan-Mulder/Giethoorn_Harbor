import { IsObject, IsArray, IsNumber, IsDate } from 'class-validator';
import { Dock } from '../dock/dock.model';
import { Ship } from '../ship/ship.model';
import { Truck } from '../truck/truck.model';
import { Tugboat } from '../tugboat/tugboat.model';

export class Passage {
  @IsNumber()
  public id: number;

  @IsObject()
  public ship: Ship;

  @IsObject()
  public truck: Truck;

  @IsObject()
  public dock: Dock;

  @IsArray()
  public tugboats: Array<Tugboat>;

  @IsDate()
  public arrival: Date;

  @IsDate()
  public departure: Date;
}