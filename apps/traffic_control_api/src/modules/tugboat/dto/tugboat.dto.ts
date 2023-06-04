import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsDate } from "class-validator";
import { Tugboat } from "../entities/tugboat.entity";

export class TugboatDTO implements Readonly<TugboatDTO> {
  @IsNumber()
  @ApiProperty()
  public id: number;

  @IsString()
  @ApiProperty()
  public stream_id: string;

  @IsNumber()
  @ApiProperty()
  public name: string;

  @IsDate()
  @ApiProperty()
  public created_at: Date;

  public static from(dto: Partial<TugboatDTO>) {
    const it = new TugboatDTO();
    it.id = dto.id;
    it.stream_id = dto.stream_id;
    it.name = dto.name;
    it.created_at = dto.created_at;
    return it;
  }

  public static fromEntity(entity: Tugboat) {
    return this.from({
      id: entity.id,
      stream_id: entity.stream_id,
      name: entity.name,
      created_at: entity.created_at
    });
  }

  public toEntity() {
    const it = new Tugboat();
    it.id = this.id;
    it.stream_id = this.stream_id;
    it.name = this.name;;
    it.created_at = this.created_at;
    return it;
  }
}