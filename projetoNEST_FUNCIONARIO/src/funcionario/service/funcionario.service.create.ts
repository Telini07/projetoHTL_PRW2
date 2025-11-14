import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FuncionarioRequest } from "../dto/request/funcionario.request";
import { ConverterFuncionario } from "../dto/converter/funcionario.converter";
import { Funcionario } from "../entity/funcionario.entity";

@Injectable()
export class FuncionarioServiceCreate{

  constructor(
    @InjectRepository(Funcionario)
    private readonly funcionarioRepository: Repository<Funcionario>
  ){}

  async create(funcionarioRequest:FuncionarioRequest){
    const funcionario = ConverterFuncionario.toFuncionario(funcionarioRequest);

    const newFuncionario = await this.funcionarioRepository.save(funcionario);

    const funcionarioResponse = ConverterFuncionario.toFuncionarioResponse(newFuncionario);

    return funcionarioResponse;
  }
}