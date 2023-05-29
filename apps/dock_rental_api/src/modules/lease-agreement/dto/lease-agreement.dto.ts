import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsDate } from "class-validator";
import { Column, OneToOne, JoinColumn } from "typeorm";
import { Dock } from "../../dock/entities/dock.entity";
import { ShippingCompany } from "../../shipping-company/entity/shipping-company.entity";
import { LeaseAgreement } from "../entities/lease-agreement.entity";


export class LeaseAgreementDTO implements Readonly<LeaseAgreementDTO> {

  @IsNumber()
  @ApiProperty({ required: true })
  public id: number;

  @IsString()
  @ApiProperty({ required: true })
  public stream_id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  public reference: string;

  @OneToOne(() => Dock)
  @JoinColumn()
  public dock: Dock;

  @OneToOne(() => ShippingCompany)
  @JoinColumn()
  public shippingCompany: ShippingCompany;

  @IsDate()
  @ApiProperty({ required: true })
  public signDate: Date;

  @IsDate()
  @ApiProperty({ required: true })
  public validUntil: Date;

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
    it.dock = dto.dock;
    it.shippingCompany = dto.shippingCompany;
    it.signDate = dto.signDate;
    it.validUntil = dto.validUntil;
    it.price = dto.price;
    it.created_at = dto.created_at;
    return it;
  }

  public static fromEntity(entity: LeaseAgreement) {
    return this.from({
      id: entity.id,
      stream_id: entity.stream_id,
      reference: entity.reference,
      dock: entity.dock,
      shippingCompany: entity.shippingCompany,
      signDate: entity.signDate,
      validUntil: entity.validUntil,
      price: entity.price,
      created_at: entity.created_at
    });
  }

  public toEntity() {
    const it = new LeaseAgreement();
    it.id = this.id;
    it.stream_id = this.stream_id;
    it.reference = this.reference;
    it.dock = this.dock;
    it.shippingCompany = this.shippingCompany;
    it.signDate = this.signDate;
    it.validUntil = this.validUntil;
    it.price = this.price;
    it.created_at = this.created_at;
    return it;
  }
}