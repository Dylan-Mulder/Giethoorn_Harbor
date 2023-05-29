import { IsNotEmpty } from "class-validator";
import { Passage } from "../../passage/passage.entity";

export class UpdateTrafficPlanningDTO {

  @IsNotEmpty()
  public readonly id: number;

  @IsNotEmpty()
  public readonly passages: Array<Passage>;

  @IsNotEmpty()
  public readonly startDate: Date;

  @IsNotEmpty()
  public readonly endDate: Date;

  constructor(id: number, passages: Array<Passage>, startDate: Date, endDate: Date) {
    this.id = id;
    this.passages = passages;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}