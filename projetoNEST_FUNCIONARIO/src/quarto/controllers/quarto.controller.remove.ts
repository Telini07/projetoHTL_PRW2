import { Controller, Delete, Param, HttpCode, HttpStatus, ParseIntPipe } from "@nestjs/common";
import { QuartoServiceRemove } from "../service/quarto.service.remove";
import { ROUTE } from 'src/commons/constants/url.sistema';

@Controller(ROUTE.QUARTO.BASE)
export class QuartoControllerRemove{

  constructor(private readonly quartoServiceRemove : QuartoServiceRemove){}

  @HttpCode(HttpStatus.OK)
  @Delete(ROUTE.QUARTO.DELETE)
  async remove(@Param('id', ParseIntPipe) id:number){
    return await this.quartoServiceRemove.remove(id);
  }
}