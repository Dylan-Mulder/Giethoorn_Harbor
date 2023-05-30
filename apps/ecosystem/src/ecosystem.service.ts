import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { response } from 'express';
import { error } from 'console';
import { WaterQualityReport } from './entities/water-quality-report.entity';

@Injectable()
export class EcosystemService {
  
  async getWaterQualityReport(): Promise<WaterQualityReport> {
    const url = 'https://www.aqualarm.nl/apwp/api/substances/bylocation/LOBI?getLatestMeasurements=true&lang=nl';
    const response = await axios.get(url);
    const data = response.data;
    const responseMappings = {
      'pH':'pH',
      'chloride':'chlorine',
      'Zuurstof HACH':'oxygenMgL',
      'Temperatuur buiten HACH':'temperature',
      'diclofenac (historisch)':'diclofenacUgL',
      'Troebelheid':'turbidity'
    }
    const wqr: WaterQualityReport = new WaterQualityReport();
    
    for (const m of data) {
      if (m.measurements && m.measurements.length > 0) {
        const measurement = m.measurements[0].value;
        const substanceName = responseMappings[m.substance.name];
        if (substanceName!=undefined) {
          wqr[substanceName] = measurement;
        }
      }
    }
    wqr.dateMeasurement= new Date(Date.now());

    return wqr;
  }

  async getMarineLifeReport(): Promise<MarineLifeReportList>{
    const token = await this.getMarineCookie();
    const response = await this.postMarineRequest(token) as string;
    const mlr = await this.parseCSVData(response);
    console.log(mlr);
    return mlr;
  }

  async getMarineCookie(): Promise<string>{
    const url = 'https://wmropendata.wur.nl/prod/zoetwatervis/29/waterlichaam/';
    const response = await axios.get(url);
    const cookie = response.headers['set-cookie'];
    const cookieString = cookie[0];
    const startIndex = cookieString.indexOf('csrftoken=') + 10; // Add the length of 'csrftoken='
    const endIndex = cookieString.indexOf(';');

    const csrfToken = cookieString.substring(startIndex, endIndex);
    return csrfToken;
  }

  async postMarineRequest(token:string): Promise<any>{
    const url = 'https://wmropendata.wur.nl/prod/zoetwatervis/29/waterlichaam/';
    const headers = {
      'Referer':url,
      'X-CSRFToken': token
    };

    const config ={
      headers:{
        'Cookie':'csrftoken='+token,
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
        report.species =values[3];
        report.scientificName = values[4];
        report.CPUE = values[5] !== '' ? parseFloat(values[5]) : 0;
        report.habitat = values[7];
  
        reports.addReport(report);
      }
  
      resolve(reports);
    });
  }
  async createWaterQuality(refillServiceData: any) {
    //const client: PoolClient = await this.pool.connect();

    try {
      // const query = `INSERT INTO ships (name) VALUES ($1) RETURNING *`;
      // const values = [shipData.name];
      
      // const result = await client.query(query, values);
      // const insertedShip: Ship = result.rows[0];

      // return insertedShip;
      
    } finally {
      //client.release();
    }
  }

}
