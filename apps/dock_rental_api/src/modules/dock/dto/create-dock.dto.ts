import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class CreateDockDTO implements Readonly<CreateDockDTO> {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  public name: string;
}
