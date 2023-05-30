import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsDate } from "class-validator";
import { Passage } from "../entities/passage.entity";

export class PassageDTO implements Readonly<PassageDTO> {
  @IsNumber()
  @ApiProperty()
  public id: number;

  @IsString()
  @ApiProperty()
  public stream_id: string;

  @IsString()
  @ApiProperty()
  public dock_id: number;

  @IsNumber()
  @ApiProperty()
  public ship_id: number;

  @IsNumber()
  @ApiProperty()
  public truck_id: number;

  @IsNumber()
  @ApiProperty()
  public tugboats: string;

  @IsDate()
  @ApiProperty()
  public arrival_date: Date;

  @IsDate()
  @ApiProperty()
  public departure_date: Date;

  @IsDate()
  @ApiProperty()
  public created_at: Date;

  public static from(dto: Partial<PassageDTO>) {
    const it = new PassageDTO();
    it.id = dto.id;
    it.stream_id = dto.stream_id;
    it.dock_id = dto.dock_id;
    it.ship_id = dto.ship_id;
    it.truck_id = dto.truck_id;
    it.tugboats = dto.tugboats;
    it.arrival_date = dto.arrival_date;
    it.departure_date = dto.departure_date;
    it.created_at = dto.created_at;
    return it;
  }

  public static fromEntity(entity: Passage) {
    return this.from({
      id: entity.id,
      stream_id: entity.stream_id,
      dock_id: entity.dock_id,
      ship_id: entity.ship_id,
      truck_id: entity.truck_id,
      tugboats: entity.tugboats,
      arrival_date: entity.arrival_date,
      departure_date: entity.departure_date,
      created_at: entity.created_at
    });
  }

  public toEntity() {
    const it = new Passage();
    it.id = this.id;
    it.stream_id = this.stream_id;
    it.created_at = this.created_at;
    return it;
  }
}