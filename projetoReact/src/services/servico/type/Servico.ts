export interface Servico {
  funcionarioId?: number;
  nome?: string;
  descricao?: string;
  valor?: number;
  criadoEm?: Date;
  atualizadoEm?: Date;
}

export interface ErrosServico {
  funcionarioId?: boolean;
  nome?: boolean;
  descricao?: boolean;
  valor?: boolean;
  criadoEm?: boolean;
  atualizadoEm?: boolean;

  funcionarioIdMensagem?: string[];
  nomeMensagem?: string[];
  descricaoMensagem?: string[];
  valorMensagem?: string[];
  criadoEmMensagem?: string[];
  atualizadoEmMensagem?: string[];
}
