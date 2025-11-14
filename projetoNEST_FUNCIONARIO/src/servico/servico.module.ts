import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicoControllerFindAll } from './controllers/servico.controller.findall';
import { ServicoControllerFindOne } from './controllers/servico.controller.findone';
import { ServicoControllerCreate } from './controllers/servico.controller.create';
import { ServicoControllerUpdate } from './controllers/servico.controller.update';
import { ServicoControllerRemove } from './controllers/servico.controller.remove';
import { ServicoServiceCreate } from './service/servico.service.create';
import { ServicoServiceUpdate } from './service/servico.service.update';
import { ServicoServiceFindAll } from './service/servico.service.findall';
import { ServicoServiceFindOne } from './service/servico.service.findone';
import { ServicoServiceRemove } from './service/servico.service.remove';
import { Servico } from './entity/servico.entity';

const servicoControllers = [
    ServicoControllerFindAll,
    ServicoControllerFindOne,
    ServicoControllerCreate,
    ServicoControllerUpdate,
    ServicoControllerRemove,
];
const servicoServices=[
  ServicoServiceCreate,
  ServicoServiceUpdate,
  ServicoServiceFindAll,
  ServicoServiceFindOne,
  ServicoServiceRemove,
]

@Module({
  imports: [
    TypeOrmModule.forFeature([Servico]),
  ],
  controllers: [
    ...servicoControllers,
  ],
  providers: [
    ...servicoServices,
  ],
  exports:[
    ...servicoServices,
  ]
})
export class ServicoModule {}
