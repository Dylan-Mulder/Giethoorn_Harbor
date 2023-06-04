import "reflect-metadata";
import { DataSource } from "typeorm";
import { Dock } from "../../modules/dock/entities/dock.entity";
import { Passage } from "../../modules/passage/entities/passage.entity";
import { Ship } from "../../modules/ship/entities/ship.entity";
import { TrafficPlanning } from "../../modules/traffic-planning/entities/traffic-planning.entity";
import { Truck } from "../../modules/truck/entities/truck.entity";
import { Tugboat } from "../../modules/tugboat/entities/tugboat.entity";

const datasource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: 'gh_traffic_control',
  password: 'nsg762dsak21',
  database: process.env.POSTGRES_DATABASE,
  synchronize: false,
  logging: false,
  entities: [Dock, Passage, Ship, TrafficPlanning, Truck, Tugboat],
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