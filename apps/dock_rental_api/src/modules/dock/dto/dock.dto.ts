import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString, } from 'class-validator';
import { Dock } from '../entities/dock.entity';

export class DockDTO implements Readonly<DockDTO> {
  @IsNumber()
  @ApiProperty({ required: true })
  public id: number;

  @IsString()
  @ApiProperty({ required: true })
  public stream_id: string;

  @IsString()
  @ApiProperty({ required: true })
  public name: string;

  @IsDate()
  @ApiProperty({ required: true })
  public created_at: Date;

  public static from(dto: Partial<DockDTO>) {
    const it = new DockDTO();
    it.id = dto.id;
    it.name = dto.name;
    it.stream_id = dto.stream_id;
    it.created_at = dto.created_at;
    return it;
  }

  public static fromEntity(entity: Dock) {
    return this.from({
      id: entity.id,
      name: entity.name,
      stream_id: entity.stream_id,
      created_at: entity.created_at
    });
  }

  public toEntity() {
    const it = new Dock();
    it.id = this.id;
    it.name = this.name;
    it.stream_id = this.stream_id;
    it.created_at = this.created_at;
    return it;
  }
}