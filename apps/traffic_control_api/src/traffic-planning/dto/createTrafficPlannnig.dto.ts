import { IsNotEmpty } from "class-validator";
import { Passage } from "../../passage/passage.model";

export class CreateTrafficPlanningDTO {

  @IsNotEmpty()
  public readonly passages: Array<Passage>;

  @IsNotEmpty()
  public readonly startDate: Date;

  @IsNotEmpty()
  public readonly endDate: Date;

  constructor(passages: Array<Passage>, startDate: Date, endDate: Date) {
    this.passages = passages;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}