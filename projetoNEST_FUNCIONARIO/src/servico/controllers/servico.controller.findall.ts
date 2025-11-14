import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ServicoServiceFindAll } from '../service/servico.service.findall';
import { ROUTE } from 'src/commons/constants/url.sistema';

@Controller(ROUTE.SERVICO.BASE)
export class ServicoControllerFindAll {

  constructor(private readonly servicoServiceFindAll : ServicoServiceFindAll){}

  @HttpCode(HttpStatus.OK)
  @Get(ROUTE.SERVICO.LIST)
  async findAll() {
    return await this.servicoServiceFindAll.findAll();
  }
}
