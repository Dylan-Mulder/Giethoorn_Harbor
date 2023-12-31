import { Injectable } from '@nestjs/common';
import { ITrafficPlanningService } from '../../interfaces/ITrafficPlanning.service';
import { Repository } from 'typeorm';
import { TrafficPlanning } from './entities/traffic-planning.entity';
import { CreateTrafficPlanningDTO } from './dto/create-traffic-planning.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TrafficPlanningDTO } from './dto/traffic-planning.dto';

@Injectable()
export class TrafficPlanningService implements ITrafficPlanningService {

  constructor(@InjectRepository(TrafficPlanning) private readonly repo: Repository<TrafficPlanning>) { }

  public async createTrafficPlanning(dto: CreateTrafficPlanningDTO): Promise<TrafficPlanning> {
    dto.start_date = new Date(dto.start_date);
    dto.end_date = new Date(dto.end_date);

    const planning = this.repo.create(dto);
    return await this.repo.save(planning);
  }

  public async getTrafficPlanningById(id: number): Promise<TrafficPlanningDTO> {
    return TrafficPlanningDTO.fromEntity(await this.repo.findOne({ where: { id: id } }));
  }

  public async getAllTrafficPlannings(): Promise<Array<TrafficPlanningDTO>> {
    return await this.repo.find().then((trafficplannings: Array<TrafficPlanning>) => trafficplannings.map(d => TrafficPlanningDTO.fromEntity(d)));
  }

  public async updateTrafficPlanningById(id: number, dto: CreateTrafficPlanningDTO): Promise<TrafficPlanning> {
    dto.start_date = new Date(dto.start_date);
    dto.end_date = new Date(dto.end_date);
    await this.repo.update(id, dto)
    return await this.getTrafficPlanningById(id);
  }

  public async deleteTrafficPlanningById(id: number): Promise<TrafficPlanning> {
    const obj = await this.getTrafficPlanningById(id);
    await this.repo.delete(id);
    return obj;
  }
}