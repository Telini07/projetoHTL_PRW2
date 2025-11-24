import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Quarto } from "../entity/quarto.entity";

@Injectable()
export class QuartoServiceFindAll{

  constructor(
    @InjectRepository(Quarto)
    private readonly quartoRepository: Repository<Quarto>
  ){}

  async findAll(){
    return await this.quartoRepository.find();
  }
}