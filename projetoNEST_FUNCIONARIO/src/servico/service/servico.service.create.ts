import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ServicoRequest } from "../dto/request/servico.request";
import { ConverterServico } from "../dto/converter/servico.converter";
import { Servico } from "../entity/servico.entity";

@Injectable()
export class ServicoServiceCreate{

  constructor(
    @InjectRepository(Servico)
    private readonly servicoRepository: Repository<Servico>
  ){}

  async create(servicoRequest:ServicoRequest){
    const servico = ConverterServico.toServico(servicoRequest);

    const newServico = await this.servicoRepository.save(servico);

    const servicoResponse = ConverterServico.toServicoResponse(newServico);

    return servicoResponse;
  }
}