import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from '../../commons/entity/base.entity';

@Entity('HTL_HOSPEDE')
export class Hospede extends BaseEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'HOSPEDE_ID',
    type: 'number',
  })
  hospedeId?: number;

  @Column({
    name: 'NOME',
    type: 'varchar2',
    length: 10,
  })
  nome: string = '';

  @Column({
    name: 'CPF',
    type: 'varchar2',
    length: 11,
    unique: true,
  })
  cpf: string = '';

  @Column({
    name: 'RG',
    type: 'varchar2',
    length: 9,
    unique: true,
  })
  rg: string = '';

  @Column({
    name: 'SEXO',
    type: 'varchar2',
    length: 1,
  })
  sexo: string = '';

  @Column({
    name: 'DATA_NASCIMENTO',
    type: 'date',
  })
  dataNascimento: Date = new Date();

   @Column({
    name: 'EMAIL',
    type: 'varchar2',
    length: 50,
  })
  email: string = '';

  @Column({
    name: 'TELEFONE',
    type: 'varchar2',
    length: 15,
  })
  telefone: string = '';

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

  constructor(data: Partial<Hospede> = {}) {
    super();
    Object.assign(this, data);
  }
}