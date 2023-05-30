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
  public amount_of_ship_spots: number;

  @IsNumber()
  @ApiProperty()
  public amount_of_truck_spots: number;

  @IsDate()
  @ApiProperty()
  public created_at: Date;

  public static from(dto: Partial<DockDTO>) {
    const it = new DockDTO();
    it.id = dto.id;
    it.stream_id = dto.stream_id;
    it.name = dto.name;
    it.description = dto.description;
    it.amount_of_ship_spots = dto.amount_of_ship_spots;
    it.amount_of_truck_spots = dto.amount_of_truck_spots;
    it.created_at = dto.created_at;
    return it;
  }

  public static fromEntity(entity: Dock) {
    return this.from({
      id: entity.id,
      stream_id: entity.stream_id,
      name: entity.name,
      description: entity.description,
      amount_of_ship_spots: entity.amount_of_ship_spots,
      amount_of_truck_spots: entity.amount_of_truck_spots,
      created_at: entity.created_at
    });
  }

  public toEntity() {
    const it = new Dock();
    it.id = this.id;
    it.stream_id = this.stream_id;
    it.name = this.name;
    it.description = this.description;
    it.amount_of_ship_spots = this.amount_of_ship_spots;
    it.amount_of_truck_spots = this.amount_of_truck_spots;
    it.created_at = this.created_at;
    return it;
  }
}