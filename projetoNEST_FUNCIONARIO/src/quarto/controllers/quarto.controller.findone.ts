import { Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe } from '@nestjs/common';
import { QuartoServiceFindOne } from '../service/quarto.service.findone';
import { ROUTE } from 'src/commons/constants/url.sistema';

@Controller(ROUTE.QUARTO.BASE)
export class QuartoControllerFindOne {
  constructor(private readonly quartoServiceFindOne : QuartoServiceFindOne){}

  @HttpCode(HttpStatus.OK)
  @Get(ROUTE.QUARTO.BY_ID)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.quartoServiceFindOne.findOne(id);
  }
}
