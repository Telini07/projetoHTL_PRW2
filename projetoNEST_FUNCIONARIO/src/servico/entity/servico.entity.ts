import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from '../../commons/entity/base.entity';

@Entity('HTL_SERVICO')
export class Servico extends BaseEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'SERVICO_ID',
    type: 'number',
  })
  servicoId?: number;

  @Column({
    name: 'NOME',
    type: 'varchar2',
    length: 20,
  })
  nome: string = '';

  @Column({
    name: 'DESCRICAO',
    type: 'varchar2',
    length: 50,
  })
  descricao: string = '';

  @Column({
    name: 'VALOR',
    type: 'number',
  })
  valor: number = 0;

  @CreateDateColumn({
    name: 'CRIADO_EM',
    type: 'timestamp',
  })
  criadoEm?: Date;

  @UpdateDateColumn({
    name: 'ATUALIZADO_EM',
    type: 'timestamp',
  })
  atualizadoEm?: Date;

  constructor(data: Partial<Servico> = {}) {
    super();
    Object.assign(this, data);
  }
}