import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FuncionarioControllerFindAll } from './controllers/funcionario.controller.findall';
import { FuncionarioControllerFindOne } from './controllers/funcionario.controller.findone';
import { FuncionarioControllerCreate } from './controllers/funcionario.controller.create';
import { FuncionarioControllerUpdate } from './controllers/funcionario.controller.update';
import { FuncionarioControllerRemove } from './controllers/funcionario.controller.remove';
import { FuncionarioServiceCreate } from './service/funcionario.service.create';
import { FuncionarioServiceUpdate } from './service/funcionario.service.update';
import { FuncionarioServiceFindAll } from './service/funcionario.service.findall';
import { FuncionarioServiceFindOne } from './service/funcionario.service.findone';
import { FuncionarioServiceRemove } from './service/funcionario.service.remove';
import { Funcionario } from './entity/funcionario.entity';

const funcionarioControllers = [
    FuncionarioControllerFindAll,
    FuncionarioControllerFindOne,
    FuncionarioControllerCreate,
    FuncionarioControllerUpdate,
    FuncionarioControllerRemove,
];
const funcionarioServices=[
  FuncionarioServiceCreate,
  FuncionarioServiceUpdate,
  FuncionarioServiceFindAll,
  FuncionarioServiceFindOne,
  FuncionarioServiceRemove,
]

@Module({
  imports: [
    TypeOrmModule.forFeature([Funcionario]),
  ],
  controllers: [
    ...funcionarioControllers,
  ],
  providers: [
    ...funcionarioServices,
  ],
  exports:[
    ...funcionarioServices,
  ]
})
export class FuncionarioModule {}
