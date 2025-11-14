import { Body, Controller, Param, HttpCode, HttpStatus, Put, ParseIntPipe  } from "@nestjs/common";
import { ServicoRequest } from "../dto/request/servico.request";
import { ServicoServiceUpdate } from "../service/servico.service.update";
import { ROUTE } from 'src/commons/constants/url.sistema';

@Controller(ROUTE.SERVICO.BASE)
export class ServicoControllerUpdate{

  constructor(private readonly servicoServiceUpdate: ServicoServiceUpdate){}

  @HttpCode(HttpStatus.OK)
  @Put(ROUTE.SERVICO.UPDATE)
  async update(@Param('id', ParseIntPipe) id: number, @Body() servicoRequest:ServicoRequest){

    return await this.servicoServiceUpdate.update(id, servicoRequest);
  }
}