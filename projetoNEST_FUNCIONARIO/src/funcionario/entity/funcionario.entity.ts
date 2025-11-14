import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../commons/entity/base.entity';

@Entity('HTL_FUNCIONARIO')
export class Funcionario extends BaseEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'FUNCIONARIO_ID',
    type: 'number',
  })
  funcionarioId?: number;

  @Column({
    name: 'NOME',
    type: 'varchar2',
    length: 10,
  })
  nome: string = '';

  @Column({
    name: 'EMAIL',
    type: 'varchar2',
    length: 50,
  })
  email: string = '';

  @Column({
    name: 'SENHA',
    type: 'varchar2',
  })
  senha: string = '';

  @Column({
    name: 'ATIVO',
    type: 'number',
  })
  ativo: number = 1;

  constructor(data: Partial<Funcionario> = {}) {
    super();
    Object.assign(this, data);
  }
}