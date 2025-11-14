import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Servico } from "../entity/servico.entity";

@Injectable()
export class ServicoServiceRemove{

  constructor(
    @InjectRepository(Servico)
    private readonly servicoRepository: Repository<Servico>
  ){}

  async remove(id:number){
    const servico = await this.servicoRepository.findOne({
      where: { servicoId: id }
    });

    if (!servico) {
      throw new Error('Serviço não encontrado');
    }

    // Deletar o serviço
    await this.servicoRepository.delete(id);

    // Retornar uma mensagem de sucesso
    return {
      message: 'Serviço removido com sucesso',
      deletedId: id
    };
  }
}