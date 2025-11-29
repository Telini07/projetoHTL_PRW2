import { Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe } from '@nestjs/common';
import { HospedeServiceFindOne } from '../service/hospede.service.findone';
import { ROUTE } from 'src/commons/constants/url.sistema';

@Controller(ROUTE.HOSPEDE.BASE)
export class HospedeControllerFindOne {
  constructor(private readonly hospedeServiceFindOne : HospedeServiceFindOne){}

  @HttpCode(HttpStatus.OK)
  @Get(ROUTE.HOSPEDE.BY_ID)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.hospedeServiceFindOne.findOne(id);
  }
}
