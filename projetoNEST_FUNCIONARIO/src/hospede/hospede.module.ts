import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HospedeControllerFindAll } from './controllers/hospede.controller.findall';
import { HospedeControllerFindOne } from './controllers/hospede.controller.findone';
import { HospedeControllerCreate } from './controllers/hospede.controller.create';
import { HospedeControllerUpdate } from './controllers/hospede.controller.update';
import { HospedeControllerRemove } from './controllers/hospede.controller.remove';
import { HospedeServiceCreate } from './service/hospede.service.create';
import { HospedeServiceUpdate } from './service/hospede.service.update';
import { HospedeServiceFindAll } from './service/hospede.service.findall';
import { HospedeServiceFindOne } from './service/hospede.service.findone';
import { HospedeServiceRemove } from './service/hospede.service.remove';
import { Hospede } from './entity/hospede.entity';

const hospedeControllers = [
    HospedeControllerFindAll,
    HospedeControllerFindOne,
    HospedeControllerCreate,
    HospedeControllerUpdate,
    HospedeControllerRemove,
];
const hospedeServices=[
  HospedeServiceCreate,
  HospedeServiceUpdate,
  HospedeServiceFindAll,
  HospedeServiceFindOne,
  HospedeServiceRemove,
]

@Module({
  imports: [
    TypeOrmModule.forFeature([Hospede]),
  ],
  controllers: [
    ...hospedeControllers,
  ],
  providers: [
    ...hospedeServices,
  ],
  exports:[
    ...hospedeServices,
  ]
})
export class HospedeModule {}
