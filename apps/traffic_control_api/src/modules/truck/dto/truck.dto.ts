import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsDate } from "class-validator";
import { Truck } from "../entities/truck.entity";

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

  @IsDate()
  @ApiProperty()
  public created_at: Date;

  public static from(dto: Partial<TruckDTO>) {
    const it = new TruckDTO();
    it.id = dto.id;
    it.stream_id = dto.stream_id;
    it.name = dto.name;
    it.shipping_company_name = dto.shipping_company_name;
    it.created_at = dto.created_at;
    return it;
  }

  public static fromEntity(entity: Truck) {
    return this.from({
      id: entity.id,
      stream_id: entity.stream_id,
      name: entity.name,
      shipping_company_name: entity.shipping_company_name,
      created_at: entity.created_at
    });
  }

  public toEntity() {
    const it = new Truck();
    it.id = this.id;
    it.stream_id = this.stream_id;
    it.name = this.name;
    it.shipping_company_name = this.shipping_company_name;
    it.created_at = this.created_at;
    return it;
  }
}