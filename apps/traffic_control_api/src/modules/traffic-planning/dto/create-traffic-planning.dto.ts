import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class CreateTrafficPlanningDTO implements Readonly<CreateTrafficPlanningDTO> {

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  public passages: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  public start_date: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  public end_date: string;
}