import { MarineLifeReport } from "../entities/marine-life-report.entity";
import { WaterQualityReport } from "../entities/water-quality-report.entity";

export default () => ({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: 'gh_ecosystem',
  password: 'URY382992ef',
  database: process.env.POSTGRES_DATABASE,
  entities: [MarineLifeReport, WaterQualityReport],
  synchronize: false,
  migrationsRun: false
});