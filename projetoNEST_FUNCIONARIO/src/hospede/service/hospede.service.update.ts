import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HospedeRequest } from "../dto/request/hospede.request";
import { ConverterHospede } from "../dto/converter/hospede.converter";
import { Hospede } from "../entity/hospede.entity";

@Injectable()
export class HospedeServiceUpdate{

  constructor(
    @InjectRepository(Hospede)
    private readonly hospedeRepository: Repository<Hospede>
  ){}

  async update(id:number, hospedeRequest:HospedeRequest){

    const hospede = ConverterHospede.toHospede(hospedeRequest);

    const existingHospede = await this.hospedeRepository.findOne({
      where: { hospedeId: id }
    });

    if (!existingHospede) {
      throw new Error('Hóspede não encontrado');
    }

    const updatedHospede = {
      ...existingHospede,
      ...hospede,
    };

    const savedHospede = await this.hospedeRepository.save(updatedHospede);

    const hospedeResponse = ConverterHospede.toHospedeResponse(savedHospede);
    return hospedeResponse;
  }
}