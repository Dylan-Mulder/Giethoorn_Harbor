export class MarineLifeReport {
  id: number;
  year: number;
  species: string;
  scientificName: string;
  CPUE: number;
  habitat: string;
}
export class MarineLifeReportList {
  reports: MarineLifeReport[];

  constructor() {
    this.reports = [];
  }

  addReport(report: MarineLifeReport) {
    this.reports.push(report);
  }
}