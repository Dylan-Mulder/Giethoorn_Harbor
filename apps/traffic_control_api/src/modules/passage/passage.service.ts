import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult, DeleteResult } from "typeorm";
import { IPassageService } from "../../interfaces/IPassage.service";
import { CreatePassageDTO } from "./dto/create-passage.dto";
import { PassageDTO } from "./dto/passage.dto";
import { Passage } from "./entities/passage.entity";

@Injectable()
export class PassageService implements IPassageService {

  constructor(@InjectRepository(Passage) private readonly repo: Repository<Passage>) { }

  public async getPassageById(id: number): Promise<PassageDTO> {
    return PassageDTO.fromEntity(await this.repo.findOne({ where: { id: id } }));
  }

  public async getAllPassages(): Promise<Array<PassageDTO>> {
    return await this.repo.find().then((docks: Array<Passage>) => docks.map(d => PassageDTO.fromEntity(d)));
  }

  public async createPassage(dto: CreatePassageDTO): Promise<Passage> {
    console.trace('KAAAANKKKEEERRRR DTO:::: ' + JSON.stringify(dto))
    dto.arrival = new Date(dto.arrival);
    dto.departure = new Date(dto.departure);

    const passage = this.repo.create(dto);
    console.trace('KAAAANKKKEEERRRR OBJECTS:::: ' + JSON.stringify(passage))
    return await this.repo.save(passage);
  }

  public async updatePassageById(id: number, updatePassage: CreatePassageDTO): Promise<UpdateResult> {
    updatePassage.arrival = new Date(updatePassage.arrival);
    updatePassage.departure = new Date(updatePassage.departure);
    return await this.repo.update(id, updatePassage)
  }

  public async deletePassageById(id: number): Promise<DeleteResult> {
    return await this.repo.delete(id)
  }
}