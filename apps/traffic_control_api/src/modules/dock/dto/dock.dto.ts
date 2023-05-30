import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsDate } from "class-validator";
import { Dock } from "../entities/dock.entity";

export class DockDTO implements Readonly<DockDTO> {
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
  public description: string;

  @IsNumber()
  @ApiProperty()
  public amountOfShipSpots: number;

  @IsNumber()
  @ApiProperty()
  public amountOfTruckSpots: number;

  @IsDate()
  @ApiProperty()
  public created_at: Date;

  public static from(dto: Partial<DockDTO>) {
    const it = new DockDTO();
    it.id = dto.id;
    it.stream_id = dto.stream_id;
    it.name = dto.name;
    it.description = dto.description;
    it.amountOfShipSpots = dto.amountOfShipSpots;
    it.amountOfTruckSpots = dto.amountOfTruckSpots;
    it.created_at = dto.created_at;
    return it;
  }

  public static fromEntity(entity: Dock) {
    return this.from({
      id: entity.id,
      stream_id: entity.stream_id,
      name: entity.name,
      description: entity.description,
      amountOfShipSpots: entity.amountOfShipSpots,
      amountOfTruckSpots: entity.amountOfTruckSpots,
      created_at: entity.created_at
    });
  }

  public toEntity() {
    const it = new Dock();
    it.id = this.id;
    it.stream_id = this.stream_id;
    it.name = this.name;
    it.description = this.description;
    it.amountOfShipSpots = this.amountOfShipSpots;
    it.amountOfTruckSpots = this.amountOfTruckSpots;
    it.created_at = this.created_at;
    return it;
  }
}