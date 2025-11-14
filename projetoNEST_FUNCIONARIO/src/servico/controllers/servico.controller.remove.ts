import { Controller, Delete, Param, HttpCode, HttpStatus, ParseIntPipe } from "@nestjs/common";
import { ServicoServiceRemove } from "../service/servico.service.remove";
import { ROUTE } from 'src/commons/constants/url.sistema';

@Controller(ROUTE.SERVICO.BASE)
export class ServicoControllerRemove{

  constructor(private readonly servicoServiceRemove : ServicoServiceRemove){}

  @HttpCode(HttpStatus.OK)
  @Delete(ROUTE.SERVICO.DELETE)
  async remove(@Param('id', ParseIntPipe) id:number){
    return await this.servicoServiceRemove.remove(id);
  }
}