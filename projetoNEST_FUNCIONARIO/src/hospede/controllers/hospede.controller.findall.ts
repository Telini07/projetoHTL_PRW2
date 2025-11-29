import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { HospedeServiceFindAll } from '../service/hospede.service.findall';
import { ConverterHospede } from '../dto/converter/hospede.converter';
import { ROUTE } from 'src/commons/constants/url.sistema';

@Controller(ROUTE.HOSPEDE.BASE)
export class HospedeControllerFindAll {

  constructor(private readonly hospedeServiceFindAll : HospedeServiceFindAll){}

  @HttpCode(HttpStatus.OK)
  @Get(ROUTE.HOSPEDE.LIST)
  async findAll() {
    const hospedes = await this.hospedeServiceFindAll.findAll();
    return hospedes.map(ConverterHospede.toHospedeResponse);
  }
}
