import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString, IsUUID, } from 'class-validator';
import { Dock } from './dock.entity';

export class DockDTO implements Readonly<DockDTO> {
  @ApiProperty({ required: true })
  @IsNumber()
  id: number;

  @ApiProperty({ required: true })
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsUUID()
  stream_id: string;

  @ApiProperty({ required: true })
  @IsBoolean()
  isActive: true;

  @ApiProperty({ required: true })
  @IsBoolean()
  isArchived: false;

  public static from(dto: Partial<DockDTO>) {
    const it = new DockDTO();
    it.id = dto.id;
    it.name = dto.name;
    return it;
  }

  public static fromEntity(entity: Dock) {
    return this.from({
      id: entity.id,
      name: entity.name,
    });
  }

  public toEntity() {
    const it = new Dock();
    it.id = this.id;
    it.name = this.name;
    it.isActive = true;
    it.isArchived = false;
    return it;
  }
}