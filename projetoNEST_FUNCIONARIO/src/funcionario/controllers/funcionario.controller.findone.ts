import { Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe } from '@nestjs/common';
import { FuncionarioServiceFindOne } from '../service/funcionario.service.findone';
import { ROUTE } from 'src/commons/constants/url.sistema';

@Controller(ROUTE.FUNCIONARIO.BASE)
export class FuncionarioControllerFindOne {
  constructor(private readonly funcionarioServiceFindOne : FuncionarioServiceFindOne){}

  @HttpCode(HttpStatus.OK)
  @Get(ROUTE.FUNCIONARIO.BY_ID)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.funcionarioServiceFindOne.findOne(id);
  }
}
