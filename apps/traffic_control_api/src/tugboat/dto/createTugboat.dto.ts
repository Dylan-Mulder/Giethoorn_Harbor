import { IsNotEmpty } from "class-validator";

export class CreateTugboatDTO {

  @IsNotEmpty()
  public readonly name: string;

  constructor(name: string) {
    this.name = name;
  }
}