import { Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { HospedeServiceFindOne } from '../service/hospede.service.findone';
import { ConverterHospede } from '../dto/converter/hospede.converter';
import { ROUTE } from 'src/commons/constants/url.sistema';

@Controller(ROUTE.HOSPEDE.BASE)
export class HospedeControllerFindOne {
  constructor(private readonly hospedeServiceFindOne : HospedeServiceFindOne){}

  @HttpCode(HttpStatus.OK)
  @Get(ROUTE.HOSPEDE.BY_ID)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const hospede = await this.hospedeServiceFindOne.findOne(id);
    if (!hospede) {
      throw new NotFoundException('Hóspede não encontrado');
    }
    return ConverterHospede.toHospedeResponse(hospede);
  }
}
