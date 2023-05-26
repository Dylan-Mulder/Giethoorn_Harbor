import { Injectable } from '@nestjs/common';
import { WaterQualityReport } from '../models/waterQualityReport.model';
import axios from 'axios';

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
}
