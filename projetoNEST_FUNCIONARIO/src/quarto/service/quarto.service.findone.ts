import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Quarto } from "../entity/quarto.entity";

@Injectable()
export class QuartoServiceFindOne{

  constructor(
    @InjectRepository(Quarto)
    private readonly quartoRepository: Repository<Quarto>
  ){}

  async findOne(id:number){
    return await this.quartoRepository.findOne({
      where: { quartoId: id }
    });
  }
}