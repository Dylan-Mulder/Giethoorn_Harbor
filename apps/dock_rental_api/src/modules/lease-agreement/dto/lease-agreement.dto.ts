import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsDate } from "class-validator";
import { LeaseAgreement } from "../entities/lease-agreement.entity";


export class LeaseAgreementDTO implements Readonly<LeaseAgreementDTO> {

  @IsNumber()
  @ApiProperty({ required: true })
  public id: number;

  @IsString()
  @ApiProperty({ required: true })
  public stream_id: string;

  @IsString()
  @ApiProperty({ required: true })
  public reference: string;

  @IsNumber()
  @ApiProperty({ required: true })
  public dock_id: number;

  @IsNumber()
  @ApiProperty({ required: true })
  public shipping_company_id: number;

  @IsDate()
  @ApiProperty({ required: true })
  public sign_date: Date;

  @IsDate()
  @ApiProperty({ required: true })
  public valid_until: Date;

  @IsNumber()
  @ApiProperty({ required: true })
  public price: number;

  @IsDate()
  @ApiProperty({ required: true })
  public created_at: Date;


  public static from(dto: Partial<LeaseAgreementDTO>) {
    const it = new LeaseAgreementDTO();
    it.id = dto.id;
    it.stream_id = dto.stream_id;
    it.reference = dto.reference;
    it.dock_id = dto.dock_id;
    it.shipping_company_id = dto.shipping_company_id;
    it.sign_date = dto.sign_date;
    it.valid_until = dto.valid_until;
    it.price = dto.price;
    it.created_at = dto.created_at;
    return it;
  }

  public static fromEntity(entity: LeaseAgreement) {
    return this.from({
      id: entity.id,
      stream_id: entity.stream_id,
      reference: entity.reference,
      dock_id: entity.dock_id,
      shipping_company_id: entity.shipping_company_id,
      sign_date: entity.sign_date,
      valid_until: entity.valid_until,
      price: entity.price,
      created_at: entity.created_at
    });
  }

  public toEntity() {
    const it = new LeaseAgreement();
    it.id = this.id;
    it.stream_id = this.stream_id;
    it.reference = this.reference;
    it.dock_id = this.dock_id;
    it.shipping_company_id = this.shipping_company_id;
    it.sign_date = this.sign_date;
    it.valid_until = this.valid_until;
    it.price = this.price;
    it.created_at = this.created_at;
    return it;
  }
}