import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreatePassageDTO implements Readonly<CreatePassageDTO> {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  public dock_id: number;

  @IsNumber()
  @ApiProperty()
  @IsNotEmpty()
  public ship_id: number;

  @IsNumber()
  @ApiProperty()
  @IsNotEmpty()
  public truck_id: number;

  @IsNumber()
  @ApiProperty()
  @IsNotEmpty()
  public tugboats: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  public arrival_date: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  public departure_date: string;
}