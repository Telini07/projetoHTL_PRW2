import { Body, Controller, Param, HttpCode, HttpStatus, Put, ParseIntPipe  } from "@nestjs/common";
import { QuartoRequest } from "../dto/request/quarto.request";
import { QuartoServiceUpdate } from "../service/quarto.service.update";
import { ROUTE } from 'src/commons/constants/url.sistema';

@Controller(ROUTE.QUARTO.BASE)
export class QuartoControllerUpdate{

  constructor(private readonly quartoServiceUpdate: QuartoServiceUpdate){}

  @HttpCode(HttpStatus.OK)
  @Put(ROUTE.QUARTO.UPDATE)
  async update(@Param('id', ParseIntPipe) id: number, @Body() quartoRequest:QuartoRequest){
    
    return await this.quartoServiceUpdate.update(id, quartoRequest);
  }
}