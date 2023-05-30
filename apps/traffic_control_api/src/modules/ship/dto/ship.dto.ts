import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsDate } from "class-validator";
import { Ship } from "../entities/ship.entity";

export class ShipDTO implements Readonly<ShipDTO> {
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

  @IsNumber()
  @ApiProperty()
  public max_load_in_tonnage: number;

  @IsNumber()
  @ApiProperty()
  public length_in_m: number;

  @IsDate()
  @ApiProperty()
  public created_at: Date;

  public static from(dto: Partial<ShipDTO>) {
    const it = new ShipDTO();
    it.id = dto.id;
    it.stream_id = dto.stream_id;
    it.name = dto.name;
    it.shipping_company_name = dto.shipping_company_name;
    it.max_load_in_tonnage = dto.max_load_in_tonnage;
    it.length_in_m = dto.length_in_m;
    it.created_at = dto.created_at;
    return it;
  }

  public static fromEntity(entity: Ship) {
    return this.from({
      id: entity.id,
      stream_id: entity.stream_id,
      name: entity.name,
      shipping_company_name: entity.shipping_company_name,
      max_load_in_tonnage: entity.max_load_in_tonnage,
      length_in_m: entity.length_in_m,
      created_at: entity.created_at
    });
  }

  public toEntity() {
    const it = new Ship();
    it.id = this.id;
    it.stream_id = this.stream_id;
    it.name = this.name;
    it.shipping_company_name = this.shipping_company_name;
    it.max_load_in_tonnage = this.max_load_in_tonnage;
    it.length_in_m = this.length_in_m;
    it.created_at = this.created_at;
    return it;
  }
}