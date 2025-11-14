import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Funcionario } from "../entity/funcionario.entity";

@Injectable()
export class FuncionarioServiceRemove{

  constructor(
    @InjectRepository(Funcionario)
    private readonly funcionarioRepository: Repository<Funcionario>
  ){}

  async remove(id:number){
    const funcionario = await this.funcionarioRepository.findOne({
      where: { funcionarioId: id }
    });

    if (!funcionario) {
      throw new Error('Funcionário não encontrado');
    }

    // Deletar o serviço
    await this.funcionarioRepository.delete(id);

    // Retornar uma mensagem de sucesso
    return {
      message: 'Funcionário removido com sucesso',
      deletedId: id
    };
  }
}