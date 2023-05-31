import { IsString, IsNumber } from 'class-validator';

export class Tugboat {

  @IsNumber()
  public id: number;

  @IsString()
  public name: string;
}