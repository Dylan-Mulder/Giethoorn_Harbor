import { IsNotEmpty } from "class-validator";

export class UpdateTugboatDTO {

  @IsNotEmpty()
  public readonly id: number;

  @IsNotEmpty()
  public readonly name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}