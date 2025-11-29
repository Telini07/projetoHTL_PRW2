import { Controller, Delete, Param, HttpCode, HttpStatus, ParseIntPipe } from "@nestjs/common";
import { HospedeServiceRemove } from "../service/hospede.service.remove";
import { ROUTE } from 'src/commons/constants/url.sistema';

@Controller(ROUTE.HOSPEDE.BASE)
export class HospedeControllerRemove{

  constructor(private readonly hospedeServiceRemove : HospedeServiceRemove){}

  @HttpCode(HttpStatus.OK)
  @Delete(ROUTE.HOSPEDE.DELETE)
  async remove(@Param('id', ParseIntPipe) id:number){
    return await this.hospedeServiceRemove.remove(id);
  }
}