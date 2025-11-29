import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { HospedeRequest } from '../dto/request/hospede.request';
import { HospedeServiceCreate } from '../service/hospede.service.create';
import { ROUTE } from 'src/commons/constants/url.sistema';

@Controller(ROUTE.HOSPEDE.BASE)
export class HospedeControllerCreate {

  constructor(private readonly hospedeServiceCreate: HospedeServiceCreate){}

  @HttpCode(HttpStatus.CREATED)
  @Post(ROUTE.HOSPEDE.CREATE)
  async create(@Body() hospedeRequest: HospedeRequest) {
    return await this.hospedeServiceCreate.create(hospedeRequest);
  }
}
