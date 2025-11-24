import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { QuartoServiceFindAll } from '../service/quarto.service.findall';
import { ROUTE } from 'src/commons/constants/url.sistema';

@Controller(ROUTE.QUARTO.BASE)
export class QuartoControllerFindAll {

  constructor(private readonly quartoServiceFindAll : QuartoServiceFindAll){}

  @HttpCode(HttpStatus.OK)
  @Get(ROUTE.QUARTO.LIST)
  async findAll() {
    return await this.quartoServiceFindAll.findAll();
  }
}
