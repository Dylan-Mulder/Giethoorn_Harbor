import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class CreateTugboatDTO implements Readonly<CreateTugboatDTO> {

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  public name: string;
}