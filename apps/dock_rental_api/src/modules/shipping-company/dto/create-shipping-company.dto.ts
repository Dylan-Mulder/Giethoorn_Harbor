import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateShippingCompanyDTO implements Readonly<CreateShippingCompanyDTO> {

  @IsString()
  @ApiProperty({ required: true })
  public reference: string;

  @IsString()
  @ApiProperty({ required: true })
  public name: string;

  @IsString()
  @ApiProperty({ required: true })
  public country: string;
}