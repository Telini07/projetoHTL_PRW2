const ENTITY_NAME = "Hospede";

export const HOSPEDE = {
  ENTITY: ENTITY_NAME,
  ALIAS: "hospede",
  DADOS_INCIAIS: {
    hospedeId: 0,
    nome: "",
    email: "",
    telefone: "",
    documento: "",
    ativo: 1,
  },
  FIELDS: {
    CODIGO: "hospedeId",
    ID: "hospedeId",
    NOME: "nome",
    EMAIL: "email",
    TELEFONE: "telefone",
    DOCUMENTO: "documento",
  } as const,
  LABEL: {
    NOME: "Nome",
    EMAIL: "Email",
    TELEFONE: "Telefone",
    DOCUMENTO: "Documento",
  },
};
