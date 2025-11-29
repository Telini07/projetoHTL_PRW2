import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Hospede } from "../entity/hospede.entity";

@Injectable()
export class HospedeServiceFindAll{

  constructor(
    @InjectRepository(Hospede)
    private readonly hospedeRepository: Repository<Hospede>
  ){}

  async findAll(){
    return await this.hospedeRepository.find();
  }
}