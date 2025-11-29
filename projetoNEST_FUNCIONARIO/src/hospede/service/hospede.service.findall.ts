import { Injectable, InternalServerErrorException } from "@nestjs/common";
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
    try{
      return await this.hospedeRepository.find({ relations: ['criadoPor'] });
    }catch(error){
      // Log error for debugging (stack will be included by the global exception filter)
      // and rethrow a NestJS exception so the filter can format it properly
      console.error('Erro ao listar hóspedes:', error);
      throw new InternalServerErrorException('Erro ao listar hóspedes', { cause: error });
    }
  }
}