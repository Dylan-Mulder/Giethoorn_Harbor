import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber, IsJSON } from "class-validator";

export class CreatePassageDTO implements Readonly<CreatePassageDTO> {
  @IsNumber()
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

  @IsJSON()
  @ApiProperty()
  @IsNotEmpty()
  public tugboats: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  public arrival: Date;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  public departure: Date;
}