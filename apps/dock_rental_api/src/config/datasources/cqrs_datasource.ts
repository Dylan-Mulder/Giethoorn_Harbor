import "reflect-metadata";
import { DataSource } from "typeorm";
import { Dock } from "../../modules/dock/entities/dock.entity";
import { LeaseAgreement } from "../../modules/lease-agreement/entities/lease-agreement.entity";
import { ShippingCompany } from "../../modules/shipping-company/entity/shipping-company.entity";

const datasource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST_CQRS,
  port: parseInt(process.env.POSTGRES_PORT),
  username: 'gh_dock_rental',
  password: 'nWiuybw4o2o',
  database: process.env.POSTGRES_DATABASE,
  synchronize: false,
  logging: false,
  entities: [Dock, LeaseAgreement, ShippingCompany],
  migrations: [],
  subscribers: [],
});

datasource.initialize()
  .then(async () => {
    console.log("Connection initialized with database...");
  })
  .catch((error) => console.log(error));

export const getCQRSDataSource = (delay = 3000): Promise<DataSource> => {
  if (datasource.isInitialized) return Promise.resolve(datasource);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (datasource.isInitialized) resolve(datasource);
      else reject("Failed to create connection with database");
    }, delay);
  });
};