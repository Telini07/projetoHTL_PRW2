import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Hospede } from "../entity/hospede.entity";

@Injectable()
export class HospedeServiceRemove{

  constructor(
    @InjectRepository(Hospede)
    private readonly hospedeRepository: Repository<Hospede>
  ){}

  async remove(id:number){
    const hospede = await this.hospedeRepository.findOne({
      where: { hospedeId: id }
    });

    if (!hospede) {
      throw new Error('Hóspede não encontrado');
    }

    // Deletar o serviço
    await this.hospedeRepository.delete(id);

    // Retornar uma mensagem de sucesso
    return {
      message: 'Hóspede removido com sucesso',
      deletedId: id
    };
  }
}