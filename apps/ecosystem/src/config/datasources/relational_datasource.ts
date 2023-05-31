import { DataSource } from "typeorm";
import { MarineLifeReport } from "../../entities/marine-life-report.entity";
import { TrafficPlanning } from "../../entities/traffic-planning.entity";
import { WaterQualityReport } from "../../entities/water-quality-report.entity";

export const datasource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: 5432,
    username: 'gh_ecosystem',
    password: 'URY382992ef',
    database: process.env.POSTGRES_DATABASE,
    synchronize: true,
    logging: true,
    entities: [MarineLifeReport, TrafficPlanning, WaterQualityReport],
    migrationsRun: false
})

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
datasource.initialize()
    .then(() => {})
    .catch((error) => console.log(error))