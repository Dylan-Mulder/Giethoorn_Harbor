import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTruckDTO implements Readonly<CreateTruckDTO> {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  public shipping_company_name: string;

  @IsBoolean()
  @ApiProperty()
  public is_cleared: boolean;

  @IsBoolean()
  @ApiProperty()
  public is_denied: boolean;
}
