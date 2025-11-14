import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { FuncionarioServiceFindAll } from '../service/funcionario.service.findall';
import { ROUTE } from 'src/commons/constants/url.sistema';

@Controller(ROUTE.FUNCIONARIO.BASE)
export class FuncionarioControllerFindAll {

  constructor(private readonly funcionarioServiceFindAll : FuncionarioServiceFindAll){}

  @HttpCode(HttpStatus.OK)
  @Get(ROUTE.FUNCIONARIO.LIST)
  async findAll() {
    return await this.funcionarioServiceFindAll.findAll();
  }
}
