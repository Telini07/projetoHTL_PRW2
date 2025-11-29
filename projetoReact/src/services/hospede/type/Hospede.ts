export interface Hospede {
  hospedeId?: number;
  nome?: string;
  email?: string;
  telefone?: string;
  documento?: string;
  ativo?: number;
}

export interface ErrosHospede {
  hospedeId?: boolean;
  nome?: boolean;
  email?: boolean;
  telefone?: boolean;
  documento?: boolean;

  hospedeIdMensagem?: string[];
  nomeMensagem?: string[];
  emailMensagem?: string[];
  telefoneMensagem?: string[];
  documentoMensagem?: string[];
}
