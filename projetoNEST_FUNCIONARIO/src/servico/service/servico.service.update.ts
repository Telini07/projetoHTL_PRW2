import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ServicoRequest } from "../dto/request/servico.request";
import { ConverterServico } from "../dto/converter/servico.converter";
import { Servico } from "../entity/servico.entity";

@Injectable()
export class ServicoServiceUpdate{

  constructor(
    @InjectRepository(Servico)
    private readonly servicoRepository: Repository<Servico>
  ){}

  async update(id:number, servicoRequest:ServicoRequest){

    const servico = ConverterServico.toServico(servicoRequest);

    const existingServico = await this.servicoRepository.findOne({
      where: { servicoId: id }
    });

    if (!existingServico) {
      throw new Error('Serviço não encontrado');
    }

    const updatedServico = {
      ...existingServico,
      ...servico,
    };

    const savedServico = await this.servicoRepository.save(updatedServico);

    const servicoResponse = ConverterServico.toServicoResponse(savedServico);
    return servicoResponse;
  }
}