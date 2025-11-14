import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Servico } from "../entity/servico.entity";

@Injectable()
export class ServicoServiceFindOne{

  constructor(
    @InjectRepository(Servico)
    private readonly servicoRepository: Repository<Servico>
  ){}

  async findOne(id:number){
    return await this.servicoRepository.findOne({
      where: { servicoId: id }
    });
  }
}