import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsDate, IsJSON } from "class-validator";
import { Passage } from "../entities/passage.entity";

export class PassageDTO implements Readonly<PassageDTO> {
  @IsNumber()
  @ApiProperty()
  public id: number;

  @IsString()
  @ApiProperty()
  public stream_id: string;

  @IsNumber()
  @ApiProperty()
  public dock_id: number;

  @IsNumber()
  @ApiProperty()
  public ship_id: number;

  @IsNumber()
  @ApiProperty()
  public truck_id: number;

  @IsJSON()
  @ApiProperty()
  public tugboats: string;

  @IsDate()
  @ApiProperty()
  public arrival: Date;

  @IsDate()
  @ApiProperty()
  public departure: Date;

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
    it.arrival = dto.arrival;
    it.departure = dto.departure;
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
      arrival: entity.arrival,
      departure: entity.departure,
      created_at: entity.created_at
    });
  }

  public toEntity() {
    const it = new Passage();
    it.id = this.id;
    it.stream_id = this.stream_id;
    it.dock_id = this.dock_id;
    it.ship_id = this.ship_id;
    it.truck_id = this.truck_id;
    it.tugboats = this.tugboats;
    it.arrival = this.arrival;
    it.departure = this.departure;
    it.created_at = this.created_at;
    return it;
  }
}