import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { QuartoRequest } from '../dto/request/quarto.request';
import { QuartoServiceCreate } from '../service/quarto.service.create';
import { ROUTE } from 'src/commons/constants/url.sistema';

@Controller(ROUTE.QUARTO.BASE)
export class QuartoControllerCreate {

  constructor(private readonly quartoServiceCreate: QuartoServiceCreate){}

  @HttpCode(HttpStatus.CREATED)
  @Post(ROUTE.QUARTO.CREATE)
  async create(@Body() quartoRequest: QuartoRequest) {
    return await this.quartoServiceCreate.create(quartoRequest);
  }
}
