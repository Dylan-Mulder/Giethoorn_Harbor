import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsDate } from "class-validator";

export class CreateLeaseAgreementDTO implements Readonly<CreateLeaseAgreementDTO> {

  @IsString()
  @ApiProperty({ required: true })
  public reference: string;

  @IsNumber()
  @ApiProperty({ required: true })
  public dock_id: number;

  @IsNumber()
  @ApiProperty({ required: true })
  public shipping_company_id: number;

  @IsString()
  @ApiProperty({ required: true })
  public sign_date: Date;

  @IsString()
  @ApiProperty({ required: true })
  public valid_until: Date;

  @IsNumber()
  @ApiProperty({ required: true })
  public price: number;
}