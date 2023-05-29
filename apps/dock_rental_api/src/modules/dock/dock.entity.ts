import { IsString } from 'class-validator';
import { Column, Entity, Generated } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';

@Entity({ name: 'dock' })
export class Dock extends BaseEntity {

  @IsString()
  @Column({ type: 'varchar', length: 300, nullable: true })
  public name: string;

  @IsString()
  @Column({ nullable: false })
  @Generated('uuid')
  public stream_id: string;
}