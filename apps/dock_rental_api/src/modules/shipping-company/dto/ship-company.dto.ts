import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsDate } from "class-validator";
import { ShippingCompany } from "../entity/shipping-company.entity";

export class ShippingCompanyDTO implements Readonly<ShippingCompanyDTO> {

  @IsNumber()
  @ApiProperty({ required: true })
  public id: number;

  @IsString()
  @ApiProperty({ required: true })
  public stream_id: string;

  @IsString()
  @ApiProperty({ required: true })
  public reference: string;

  @IsString()
  @ApiProperty({ required: true })
  public name: string;

  @IsString()
  @ApiProperty({ required: true })
  public country: string;

  @IsDate()
  @ApiProperty({ required: true })
  public created_at: Date;

  public static from(dto: Partial<ShippingCompanyDTO>) {
    const it = new ShippingCompanyDTO();
    it.id = dto.id;
    it.stream_id = dto.stream_id;
    it.reference = dto.reference;
    it.name = dto.name;
    it.country = dto.country;
    it.created_at = dto.created_at;
    return it;
  }

  public static fromEntity(entity: ShippingCompany) {
    return this.from({
      id: entity.id,
      stream_id: entity.stream_id,
      reference: entity.reference,
      name: entity.name,
      country: entity.country,
      created_at: entity.created_at
    });
  }

  public toEntity() {
    const it = new ShippingCompany();
    it.id = this.id;
    it.stream_id = this.stream_id;
    it.reference = this.reference;
    it.name = this.name;
    it.country = this.country;
    it.created_at = this.created_at;
    return it;
  }
}