import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsDate } from "class-validator";
import { TrafficPlanning } from "../entities/traffic-planning.entity";

export class TrafficPlanningDTO implements Readonly<TrafficPlanningDTO> {
  @IsNumber()
  @ApiProperty()
  public id: number;

  @IsString()
  @ApiProperty()
  public stream_id: string;

  @IsString()
  @ApiProperty()
  public passages: string;

  @IsDate()
  @ApiProperty()
  public start_date: Date;

  @IsDate()
  @ApiProperty()
  public end_date: Date;

  @IsDate()
  @ApiProperty()
  public created_at: Date;

  public static from(dto: Partial<TrafficPlanningDTO>) {
    const it = new TrafficPlanningDTO();
    it.id = dto.id;
    it.stream_id = dto.stream_id;
    it.passages = dto.passages;
    it.start_date = dto.start_date;
    it.end_date = dto.end_date;
    it.created_at = dto.created_at;
    return it;
  }

  public static fromEntity(entity: TrafficPlanning) {
    return this.from({
      id: entity.id,
      stream_id: entity.stream_id,
      passages: entity.passages,
      start_date: entity.start_date,
      end_date: entity.end_date,
      created_at: entity.created_at
    });
  }

  public toEntity() {
    const it = new TrafficPlanning();
    it.id = this.id;
    it.stream_id = this.stream_id;
    it.passages = this.passages;
    it.start_date = this.start_date;
    it.end_date = this.end_date;
    it.created_at = this.created_at;
    return it;
  }
}