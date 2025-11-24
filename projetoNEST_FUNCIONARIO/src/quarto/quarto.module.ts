import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuartoControllerFindAll } from './controllers/quarto.controller.findall';
import { QuartoControllerFindOne } from './controllers/quarto.controller.findone';
import { QuartoControllerCreate } from './controllers/quarto.controller.create';
import { QuartoControllerUpdate } from './controllers/quarto.controller.update';
import { QuartoControllerRemove } from './controllers/quarto.controller.remove';
import { QuartoServiceCreate } from './service/quarto.service.create';
import { QuartoServiceUpdate } from './service/quarto.service.update';
import { QuartoServiceFindAll } from './service/quarto.service.findall';
import { QuartoServiceFindOne } from './service/quarto.service.findone';
import { QuartoServiceRemove } from './service/quarto.service.remove';
import { Quarto } from './entity/quarto.entity';

const quartoControllers = [
    QuartoControllerFindAll,
    QuartoControllerFindOne,
    QuartoControllerCreate,
    QuartoControllerUpdate,
    QuartoControllerRemove,
];
const quartoServices=[
  QuartoServiceCreate,
  QuartoServiceUpdate,
  QuartoServiceFindAll,
  QuartoServiceFindOne,
  QuartoServiceRemove,
]

@Module({
  imports: [
    TypeOrmModule.forFeature([Quarto]),
  ],
  controllers: [
    ...quartoControllers,
  ],
  providers: [
    ...quartoServices,
  ],
  exports:[
    ...quartoServices,
  ]
})
export class QuartoModule {}
