import { Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe } from '@nestjs/common';
import { ServicoServiceFindOne } from '../service/servico.service.findone';
import { ROUTE } from 'src/commons/constants/url.sistema';

@Controller(ROUTE.SERVICO.BASE)
export class ServicoControllerFindOne {
  constructor(private readonly servicoServiceFindOne : ServicoServiceFindOne){}

  @HttpCode(HttpStatus.OK)
  @Get(ROUTE.SERVICO.BY_ID)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.servicoServiceFindOne.findOne(id);
  }
}
