import "reflect-metadata";
import { DataSource } from "typeorm";
import { GHEvent } from "../../entities/gh-event";

const datasource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST_EVENTS,
  port: 5434,
  username: 'gh_ecosystem',
  password: 'URY382992ef',
  database: process.env.POSTGRES_DATABASE,
  synchronize: false,
  logging: false,
  entities: [GHEvent],
  migrations: [],
  subscribers: [],
});

datasource.initialize()
  .then(async () => {
    console.log("Connection initialized with database...");
  })
  .catch((error) => console.log(error));

export const getEventDataSource = (delay = 3000): Promise<DataSource> => {
  if (datasource.isInitialized) return Promise.resolve(datasource);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (datasource.isInitialized) resolve(datasource);
      else reject("Failed to create connection with database");
    }, delay);
  });
};