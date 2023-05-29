import { Controller, Get } from '@nestjs/common';
import { EcosystemService } from './ecosystem.service';
import { WaterQualityReport } from '../models/waterQualityReport.model';

@Controller()
export class EcosystemController {
  constructor(private readonly ecosystemService: EcosystemService) {}

  @Get()
  getWaterQualityReport(): Promise<WaterQualityReport> {
    return this.ecosystemService.getWaterQualityReport();
  }
  
}
