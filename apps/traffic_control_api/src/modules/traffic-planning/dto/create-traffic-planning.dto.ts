import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsJSON } from "class-validator";

export class CreateTrafficPlanningDTO implements Readonly<CreateTrafficPlanningDTO> {

  @IsJSON()
  @ApiProperty()
  @IsNotEmpty()
  public passages: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  public start_date: Date;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  public end_date: Date;
}