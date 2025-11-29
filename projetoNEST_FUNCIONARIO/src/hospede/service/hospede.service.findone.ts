import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Hospede } from "../entity/hospede.entity";

@Injectable()
export class HospedeServiceFindOne{

  constructor(
    @InjectRepository(Hospede)
    private readonly hospedeRepository: Repository<Hospede>
  ){}

  async findOne(id:number){
    return await this.hospedeRepository.findOne({
      where: { hospedeId: id }
    });
  }
}