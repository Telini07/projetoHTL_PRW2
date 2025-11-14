import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Funcionario } from "../entity/funcionario.entity";

@Injectable()
export class FuncionarioServiceFindOne{

  constructor(
    @InjectRepository(Funcionario)
    private readonly funcionarioRepository: Repository<Funcionario>
  ){}

  async findOne(id:number){
    return await this.funcionarioRepository.findOne({
      where: { funcionarioId: id }
    });
  }
}