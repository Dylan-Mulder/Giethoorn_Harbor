import { Passage } from "./passage.model";

export class TrafficPlanning {
  id: number;
  passages: Array<Passage>;
  startDate: Date;
  endDate: Date;
}
