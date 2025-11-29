import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HospedeRequest } from "../dto/request/hospede.request";
import { ConverterHospede } from "../dto/converter/hospede.converter";
import { Hospede } from "../entity/hospede.entity";

@Injectable()
export class HospedeServiceCreate{

  constructor(
    @InjectRepository(Hospede)
    private readonly hospedeRepository: Repository<Hospede>
  ){}

  async create(hospedeRequest:HospedeRequest){
    const hospede = ConverterHospede.toHospede(hospedeRequest);

    const newHospede = await this.hospedeRepository.save(hospede);

    const hospedeResponse = ConverterHospede.toHospedeResponse(newHospede);

    return hospedeResponse;
  }
}