import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Service } from '../../entities/service.entity';
import { Ship } from '../../entities/ship.entity';
import { TrafficPlanning } from '../../entities/traffic-planning.entity';

const datasource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: 'gh_refilling',
  password: 'jw8s0F4',
  database: process.env.POSTGRES_DATABASE,
  synchronize: false,
  logging: false,
  entities: [Service, Ship, TrafficPlanning],
  migrations: [],
  subscribers: [],
});

datasource
  .initialize()
  .then(async () => {
    console.log('Connection initialized with database...');
  })
  .catch((error) => console.log(error));

export const getRelationalDataSource = (delay = 3000): Promise<DataSource> => {
  if (datasource.isInitialized) return Promise.resolve(datasource);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (datasource.isInitialized) resolve(datasource);
      else reject('Failed to create connection with database');
    }, delay);
  });
};
