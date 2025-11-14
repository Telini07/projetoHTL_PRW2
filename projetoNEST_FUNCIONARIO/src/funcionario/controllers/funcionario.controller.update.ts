import { Body, Controller, Param, HttpCode, HttpStatus, Put, ParseIntPipe  } from "@nestjs/common";
import { FuncionarioRequest } from "../dto/request/funcionario.request";
import { FuncionarioServiceUpdate } from "../service/funcionario.service.update";
import { ROUTE } from 'src/commons/constants/url.sistema';

@Controller(ROUTE.FUNCIONARIO.BASE)
export class FuncionarioControllerUpdate{

  constructor(private readonly funcionarioServiceUpdate: FuncionarioServiceUpdate){}

  @HttpCode(HttpStatus.OK)
  @Put(ROUTE.FUNCIONARIO.UPDATE)
  async update(@Param('id', ParseIntPipe) id: number, @Body() funcionarioRequest:FuncionarioRequest){

    return await this.funcionarioServiceUpdate.update(id, funcionarioRequest);
  }
}