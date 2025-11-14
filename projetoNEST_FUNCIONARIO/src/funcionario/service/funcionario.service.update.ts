import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FuncionarioRequest } from "../dto/request/funcionario.request";
import { ConverterFuncionario } from "../dto/converter/funcionario.converter";
import { Funcionario } from "../entity/funcionario.entity";

@Injectable()
export class FuncionarioServiceUpdate{

  constructor(
    @InjectRepository(Funcionario)
    private readonly funcionarioRepository: Repository<Funcionario>
  ){}

  async update(id:number, funcionarioRequest:FuncionarioRequest){

    const funcionario = ConverterFuncionario.toFuncionario(funcionarioRequest);

    const existingFuncionario = await this.funcionarioRepository.findOne({
      where: { funcionarioId: id }
    });

    if (!existingFuncionario) {
      throw new Error('Funcionário não encontrado');
    }

    const updatedFuncionario = {
      ...existingFuncionario,
      ...funcionario,
    };

    const savedFuncionario = await this.funcionarioRepository.save(updatedFuncionario);

    const funcionarioResponse = ConverterFuncionario.toFuncionarioResponse(savedFuncionario);
    return funcionarioResponse;
  }
}