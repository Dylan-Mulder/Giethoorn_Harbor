import { IsNotEmpty } from "class-validator";

export class CreateDockDTO {

  @IsNotEmpty()
  public readonly name: string;

  constructor(name?: string) {
    this.name = name;
  }
}