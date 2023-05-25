import { IsObject, IsArray, IsNumber, IsDate } from 'class-validator';

import { Dock } from "./dock.model";
import { Ship } from "./ship.model";
import { Truck } from "./truck.model";
import { Tugboat } from "./tugboat.model";

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