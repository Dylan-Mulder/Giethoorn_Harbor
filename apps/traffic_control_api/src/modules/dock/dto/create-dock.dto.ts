import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateDockDTO implements Readonly<CreateDockDTO> {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  public description: string;

  @IsNumber()
  @ApiProperty()
  @IsNotEmpty()
  public amountOfShipSpots: number;

  @IsNumber()
  @ApiProperty()
  @IsNotEmpty()
  public amountOfTruckSpots: number;
}