import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../commons/entity/base.entity';

@Entity('HTL_QUARTO')
export class Quarto extends BaseEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'QUARTO_ID',
    type: 'number',
  })
  quartoId?: number;

  @Column({
    name: 'IDENTIFICADOR',
    type: 'varchar2',
    length: 10,
  })
  identificador: string = '';

  @Column({
    name: 'TIPO',
    type: 'varchar2',
    length: 50,
  })
  tipo: string = '';

  @Column({
    name: 'VALOR_DIARIA',
    type: 'number',
  })
  valorDiaria: string = '';

  @Column({
    name: 'INATIVO',
    type: 'number',
  })
  inativo: number = 0;

  constructor(data: Partial<Quarto> = {}) {
    super();
    Object.assign(this, data);
  }
}