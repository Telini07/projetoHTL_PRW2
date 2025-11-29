export class HospedeResponse {
  hospedeId?: number;
  nome: string = '';
  cpf: string = '';
  rg: string = '';
  sexo: string = '';
  dataNascimento: Date = new Date();
  email: string = '';
  telefone: string = '';
  criadoEm?: Date;
  atualizadoEm?: Date;
}
