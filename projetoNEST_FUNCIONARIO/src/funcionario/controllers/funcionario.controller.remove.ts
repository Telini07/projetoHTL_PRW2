import { Controller, Delete, Param, HttpCode, HttpStatus, ParseIntPipe } from "@nestjs/common";
import { FuncionarioServiceRemove } from "../service/funcionario.service.remove";
import { ROUTE } from 'src/commons/constants/url.sistema';

@Controller(ROUTE.FUNCIONARIO.BASE)
export class FuncionarioControllerRemove{

  constructor(private readonly funcionarioServiceRemove : FuncionarioServiceRemove){}

  @HttpCode(HttpStatus.OK)
  @Delete(ROUTE.FUNCIONARIO.DELETE)
  async remove(@Param('id', ParseIntPipe) id:number){
    return await this.funcionarioServiceRemove.remove(id);
  }
}