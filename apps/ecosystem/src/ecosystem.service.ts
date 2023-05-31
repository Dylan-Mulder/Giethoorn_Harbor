import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { WaterQualityReport } from './entities/water-quality-report.entity';
import amqp from 'amqp-connection-manager';
import { MarineLifeReport, MarineLifeReportList } from './entities/marine-life-report.entity';
import { ConfigService } from '@nestjs/config';
import { getRelationalDataSource } from './config/datasources/relational_datasource';
import { Repository } from 'typeorm';

@Injectable()
export class EcosystemService {
  constructor(private readonly configService: ConfigService){
    this.initDatasources();
  };

  // RabbitMQ
  private  USER = this.configService.get('RABBITMQ_USER');
  private  PASSWORD = this.configService.get('RABBITMQ_PASS');
  private  HOST = this.configService.get('RABBITMQ_HOST');

  // Repo's
  private marineLifeReportRepo: Repository<MarineLifeReport>;
  private waterQualityReportRepo: Repository<WaterQualityReport>;

  // Init the repositories
  async initDatasources() {
    const relationalDatasource = await getRelationalDataSource();
    this.marineLifeReportRepo = relationalDatasource.getRepository(MarineLifeReport);
    this.waterQualityReportRepo = relationalDatasource.getRepository(WaterQualityReport);
  }

  async getFakeWaterQualityReport(): Promise<WaterQualityReport> {

    const report = new WaterQualityReport();

    // Set the properties of the report with fake data
    report.ph = Math.random() * 14; // Random value between 0 and 14
    report.oxygen_in_mg_per_l = Math.random() * 10; // Random value between 0 and 10
    report.temperature_in_celsius = Math.random() * 30; // Random value between 0 and 30
    report.chlorine_in_mg_per_l = Math.random() * 5; // Random value between 0 and 5
    report.start_date = new Date();
    report.turbidity = Math.random() * 100; // Random value between 0 and 100
    report.diclofenac_in_ug_per_l = Math.random() * 50; // Random value between 0 and 50

    return report;
  }

  async getFakeMarineLifeReport(): Promise<MarineLifeReportList> {
    // Create a new instance of MarineLifeReportList
    const reportList = new MarineLifeReportList();

    // Create a new instance of MarineLifeReport
    const report = new MarineLifeReport();

    // Set the properties of the report with fake data
    report.year = Math.floor(Math.random() * 10) + 2010; // Random year between 2010 and 2019
    report.species = 'Sample Species'; // Replace with your desired value
    report.scientific_name = 'Sample Scientific Name'; // Replace with your desired value
    report.cpue = Math.random() * 100; // Random value between 0 and 100
    report.habitat = 'Sample Habitat'; // Replace with your desired value
    report.season = 'Sample Season'; // Replace with your desired value

    // Add the report to the reportList
    reportList.addReport(report);

    return reportList;
  }

  async getWaterQualityReport(): Promise<WaterQualityReport> {
    const url = 'https://www.aqualarm.nl/apwp/api/substances/bylocation/LOBI?getLatestMeasurements=true&lang=nl';
    const response = await axios.get(url);
    const data = response.data;
    const responseMappings = {
      'pH': 'pH',
      'chloride': 'chlorine',
      'Zuurstof HACH': 'oxygenMgL',
      'Temperatuur buiten HACH': 'temperature',
      'diclofenac (historisch)': 'diclofenacUgL',
      'Troebelheid': 'turbidity'
    }
    const wqr: WaterQualityReport = new WaterQualityReport();

    for (const m of data) {
      if (m.measurements && m.measurements.length > 0) {
        const measurement = m.measurements[0].value;
        const substanceName = responseMappings[m.substance.name];
        if (substanceName != undefined) {
          wqr[substanceName] = measurement;
        }
      }
    }
    wqr.start_date = new Date(Date.now());

    return wqr;
  }

  async getMarineLifeReport(): Promise<MarineLifeReportList> {
    const token = await this.getMarineCookie();
    const response = await this.postMarineRequest(token) as string;
    const mlr = await this.parseCSVData(response);
    return mlr;
  }

  async getMarineCookie(): Promise<string> {
    const url = 'https://wmropendata.wur.nl/prod/zoetwatervis/29/waterlichaam/';
    const response = await axios.get(url);
    const cookie = response.headers['set-cookie'];
    const cookieString = cookie[0];
    const startIndex = cookieString.indexOf('csrftoken=') + 10; // Add the length of 'csrftoken='
    const endIndex = cookieString.indexOf(';');

    const csrfToken = cookieString.substring(startIndex, endIndex);
    return csrfToken;
  }

  async postMarineRequest(token: string): Promise<any> {
    const url = 'https://wmropendata.wur.nl/prod/zoetwatervis/29/waterlichaam/';
    const headers = {
      'Referer': url,
      'X-CSRFToken': token
    };

    const config = {
      headers: {
        'Cookie': 'csrftoken=' + token,
        ...headers
      }
    };

    const formData = {
      tuig: 'Ankerkuil',
      datatype: 'Vangst per eenheid inspanning; CPUE (aantallen)',
      jaar: '2022',
      soort: 'Alle soorten',
      soort_wet: 'Alle wetenschappelijke namen',
      download: ''
    };

    try {
      const response = await axios.post(url, new URLSearchParams(formData).toString(), config);
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async parseCSVData(csvData: string): Promise<MarineLifeReportList> {
    return new Promise((resolve, reject) => {
      const reports: MarineLifeReportList = new MarineLifeReportList();

      const rows = csvData.trim().split('\n');
      const headers = rows[0].split(',');

      for (let i = 1; i < rows.length; i++) {
        const values = rows[i].split(',');

        const report = new MarineLifeReport();
        report.year = parseInt(values[0], 10);
        report.species = values[3];
        // report.scientificName = values[4];
        // report.CPUE = values[5] !== '' ? parseFloat(values[5]) : 0;
        report.habitat = values[7];

        reports.addReport(report);
      }

      resolve(reports);
    });
  }

  async createWaterQuality(waterQualityReport: WaterQualityReport) {
    try {

      const insertedReport = await this.waterQualityReportRepo.save(waterQualityReport);

      return insertedReport;
    } catch (error) {
      console.error(error);
    }
  }

  async createMarineLifeReports(marineLifeReportList: MarineLifeReportList) {
    try {
      const insertedReports: MarineLifeReport[] = [];

      for (const report of marineLifeReportList.reports) {
        const marineLifeReport = new MarineLifeReport();
        marineLifeReport.year = report.year;
        marineLifeReport.species = report.species;
        marineLifeReport.scientific_name = report.scientific_name;
        marineLifeReport.cpue = report.cpue;
        marineLifeReport.habitat = report.habitat;
        marineLifeReport.season = report.season;
        
        const insertedReport = await this.marineLifeReportRepo.save(marineLifeReport);
        insertedReports.push(insertedReport);
      }

      return insertedReports;
    } catch (error) {
      console.error(error);
    }
  }
  async sendToQueue(exchangeName: string, routingKey: string, message: string) {
    const connection = await amqp.connect(`amqp://${this.USER}:${this.PASSWORD}@${this.HOST}`);
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, 'topic', { durable: false });
    await channel.publish(exchangeName, routingKey, Buffer.from(message));
  };
}
