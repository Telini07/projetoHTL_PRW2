import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { QuartoRequest } from "../dto/request/quarto.request";
import { ConverterQuarto } from "../dto/converter/quarto.converter";
import { Quarto } from "../entity/quarto.entity";

@Injectable()
export class QuartoServiceCreate{

  constructor(
    @InjectRepository(Quarto)
    private readonly quartoRepository: Repository<Quarto>
  ){}

  async create(quartoRequest:QuartoRequest){
    const quarto = ConverterQuarto.toQuarto(quartoRequest);

    const newQuarto = await this.quartoRepository.save(quarto);

    const quartoResponse = ConverterQuarto.toQuartoResponse(newQuarto);

    return quartoResponse;
  }
}