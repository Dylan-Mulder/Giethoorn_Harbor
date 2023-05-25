import { Passage } from "./passage.model";

export class TrafficPlanning {
  public id: number;
  public passages: Array<Passage>;
  public startDate: Date;
  public endDate: Date;
}
