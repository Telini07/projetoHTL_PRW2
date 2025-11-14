import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { FuncionarioRequest } from '../dto/request/funcionario.request';
import { FuncionarioServiceCreate } from '../service/funcionario.service.create';
import { ROUTE } from 'src/commons/constants/url.sistema';

@Controller(ROUTE.FUNCIONARIO.BASE)
export class FuncionarioControllerCreate {

  constructor(private readonly funcionarioServiceCreate: FuncionarioServiceCreate){}

  @HttpCode(HttpStatus.CREATED)
  @Post(ROUTE.FUNCIONARIO.CREATE)
  async create(@Body() funcionarioRequest: FuncionarioRequest) {
    return await this.funcionarioServiceCreate.create(funcionarioRequest);
  }
}
