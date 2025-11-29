import { Body, Controller, Param, HttpCode, HttpStatus, Put, ParseIntPipe  } from "@nestjs/common";
import { HospedeRequest } from "../dto/request/hospede.request";
import { HospedeServiceUpdate } from "../service/hospede.service.update";
import { ROUTE } from 'src/commons/constants/url.sistema';

@Controller(ROUTE.HOSPEDE.BASE)
export class HospedeControllerUpdate{

  constructor(private readonly hospedeServiceUpdate: HospedeServiceUpdate){}

  @HttpCode(HttpStatus.OK)
  @Put(ROUTE.HOSPEDE.UPDATE)
  async update(@Param('id', ParseIntPipe) id: number, @Body() hospedeRequest:HospedeRequest){

    return await this.hospedeServiceUpdate.update(id, hospedeRequest);
  }
}