export interface Hospede {
  hospedeId?: number;
  nome?: string;
  cpf?: string;
  email?: string;
  telefone?: string;
  sexo?: string;
  dataNascimento?: string; // ISO date
  ativo?: number;
  criadoPorId?: number | string;
  criadoPorNome?: string;
}

export interface ErrosHospede {
  hospedeId?: boolean;
  nome?: boolean;
  cpf?: boolean;
  email?: boolean;
  telefone?: boolean;
  sexo?: boolean;
  dataNascimento?: boolean;
  criadoPorId?: boolean;

  hospedeIdMensagem?: string[];
  nomeMensagem?: string[];
  cpfMensagem?: string[];
  emailMensagem?: string[];
  telefoneMensagem?: string[];
  sexoMensagem?: string[];
  dataNascimentoMensagem?: string[];
  criadoPorIdMensagem?: string[];
}
