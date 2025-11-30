import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HospedeRequest } from "../dto/request/hospede.request";
import { ConverterHospede } from "../dto/converter/hospede.converter";
import { Hospede } from "../entity/hospede.entity";
import { Funcionario } from '../../funcionario/entity/funcionario.entity';

@Injectable()
export class HospedeServiceCreate{

  constructor(
    @InjectRepository(Hospede)
    private readonly hospedeRepository: Repository<Hospede>,
    @InjectRepository(Funcionario)
    private readonly funcionarioRepository: Repository<Funcionario>
  ){}

  async create(hospedeRequest:HospedeRequest){
    const hospede = ConverterHospede.toHospede(hospedeRequest);

    // If criadoPor is not informed, try to find any active funcionario to set as the creator
    if (!hospede.criadoPor) {
      const funcionarioDefault = await this.funcionarioRepository.findOne({ where: { ativo: 1 } });
      if (!funcionarioDefault) {
        throw new BadRequestException('Nenhum funcionário disponível para ser atribuído como CRIADO_POR');
      }
      hospede.criadoPor = funcionarioDefault;
    }

    const newHospede = await this.hospedeRepository.save(hospede);

    const hospedeResponse = ConverterHospede.toHospedeResponse(newHospede);

    return hospedeResponse;
  }
}