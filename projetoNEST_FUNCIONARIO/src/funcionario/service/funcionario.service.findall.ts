import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Funcionario } from "../entity/funcionario.entity";

@Injectable()
export class FuncionarioServiceFindAll{

  constructor(
    @InjectRepository(Funcionario)
    private readonly funcionarioRepository: Repository<Funcionario>
  ){}

  async findAll(){
    return await this.funcionarioRepository.find();
  }
}