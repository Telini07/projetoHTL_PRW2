import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Quarto } from "../entity/quarto.entity";

@Injectable()
export class QuartoServiceRemove{

  constructor(
    @InjectRepository(Quarto)
    private readonly quartoRepository: Repository<Quarto>
  ){}

  async remove(id:number){
    // Buscar o serviço antes de deletar para confirmar que existe
    const quarto = await this.quartoRepository.findOne({
      where: { quartoId: id }
    });

    if (!quarto) {
      throw new Error('Quarto não encontrado');
    }

    // Deletar o serviço
    await this.quartoRepository.delete(id);

    // Retornar uma mensagem de sucesso
    return {
      message: 'Quarto removido com sucesso',
      deletedId: id
    };
  }
}