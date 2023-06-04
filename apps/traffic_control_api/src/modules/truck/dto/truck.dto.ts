import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDate, IsBoolean } from 'class-validator';
import { Truck } from '../entities/truck.entity';

export class TruckDTO implements Readonly<TruckDTO> {
  @IsNumber()
  @ApiProperty()
  public id: number;

  @IsString()
  @ApiProperty()
  public stream_id: string;

  @IsString()
  @ApiProperty()
  public name: string;

  @IsString()
  @ApiProperty()
  public shipping_company_name: string;

  @IsBoolean()
  @ApiProperty()
  public is_cleared: boolean;

  @IsBoolean()
  @ApiProperty()
  public is_denied: boolean;

  @IsDate()
  @ApiProperty()
  public created_at: Date;

  public static from(dto: Partial<TruckDTO>) {
    const it = new TruckDTO();
    it.id = dto.id;
    it.stream_id = dto.stream_id;
    it.name = dto.name;
    it.shipping_company_name = dto.shipping_company_name;
    it.is_cleared = dto.is_cleared;
    it.is_denied = dto.is_denied;
    it.created_at = dto.created_at;
    return it;
  }

  public static fromEntity(entity: Truck) {
    return this.from({
      id: entity.id,
      stream_id: entity.stream_id,
      name: entity.name,
      shipping_company_name: entity.shipping_company_name,
      is_cleared: entity.is_cleared,
      is_denied: entity.is_denied,
      created_at: entity.created_at,
    });
  }

  public toEntity() {
    const it = new Truck();
    it.id = this.id;
    it.stream_id = this.stream_id;
    it.name = this.name;
    it.shipping_company_name = this.shipping_company_name;
    it.is_cleared = this.is_cleared;
    it.is_denied = this.is_denied;
    it.created_at = this.created_at;
    return it;
  }
}
