import { Service } from "../entities/service.entity";
import { Ship } from "../entities/ship.entity";
import { TrafficPlanning } from "../entities/traffic-planning.entity";

export default () => ({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: 'gh_refilling',
  password: 'jw8s0F4',
  database: process.env.POSTGRES_DATABASE,
  entities: [Service, Ship, TrafficPlanning],
  synchronize: false,
  migrationsRun: false
});