import "reflect-metadata";
import { DataSource } from "typeorm";
import { MarineLifeReport } from "../../entities/marine-life-report.entity";
import { WaterQualityReport } from "../../entities/water-quality-report.entity";

const datasource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: 'gh_ecosystem',
  password: 'URY382992ef',
  database: process.env.POSTGRES_DATABASE,
  synchronize: false,
  logging: false,
  entities: [MarineLifeReport, WaterQualityReport],
  migrations: [],
  subscribers: [],
});

datasource.initialize()
  .then(async () => {
    console.log("Connection initialized with database...");
  })
  .catch((error) => console.log(error));

export const getRelationalDataSource = (delay = 3000): Promise<DataSource> => {
  if (datasource.isInitialized) return Promise.resolve(datasource);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (datasource.isInitialized) resolve(datasource);
      else reject("Failed to create connection with database");
    }, delay);
  });
};