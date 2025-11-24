import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { QuartoRequest } from "../dto/request/quarto.request";
import { ConverterQuarto } from "../dto/converter/quarto.converter";
import { Quarto } from "../entity/quarto.entity";

@Injectable()
export class QuartoServiceUpdate{

  constructor(
    @InjectRepository(Quarto)
    private readonly quartoRepository: Repository<Quarto>
  ){}

  async update(id:number, quartoRequest:QuartoRequest){

    const quarto = ConverterQuarto.toPartial(quartoRequest);

    // Buscar o serviço existente
    const existingQuarto = await this.quartoRepository.findOne({
      where: { quartoId: id }
    });

    if (!existingQuarto) {
      throw new Error('Quarto não encontrado');
    }
    
    // Atualizar os dados mantendo o createdAt
    const updatedQuarto = {
      ...existingQuarto,
      ...quarto,
    };

    const savedQuarto = await this.quartoRepository.save(updatedQuarto);

    const quartoResponse = ConverterQuarto.toQuartoResponse(savedQuarto);
    return quartoResponse;
  }
}