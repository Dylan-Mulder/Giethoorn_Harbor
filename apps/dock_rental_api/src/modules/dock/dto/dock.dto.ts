import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString, } from 'class-validator';
import { Dock } from '../entities/dock.entity';

export class DockDTO implements Readonly<DockDTO> {
  @IsNumber()
  @ApiProperty()
  public id: number;

  @IsString()
  @ApiProperty()
  public stream_id: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  public name: string;

  @IsDate()
  @ApiProperty()
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