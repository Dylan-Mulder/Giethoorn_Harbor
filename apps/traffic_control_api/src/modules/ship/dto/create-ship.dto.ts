import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateShipDTO implements Readonly<CreateShipDTO> {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  public shipping_company_name: string;

  @IsNumber()
  @ApiProperty()
  @IsNotEmpty()
  public max_load_in_tonnage: number;

  @IsNumber()
  @ApiProperty()
  @IsNotEmpty()
  public length_in_m: number;

  @IsBoolean()
  @ApiProperty()
  public is_cleared: boolean;
}
