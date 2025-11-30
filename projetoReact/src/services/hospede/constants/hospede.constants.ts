const ENTITY_NAME = "Hospede";

export const HOSPEDE = {
  ENTITY: ENTITY_NAME,
  ALIAS: "hospede",
  DADOS_INCIAIS: {
    hospedeId: undefined,
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    sexo: "MASCULINO",
    dataNascimento: new Date().toISOString().split('T')[0],
    ativo: 1,
    criadoPorId: undefined,
  },
  FIELDS: {
    CODIGO: "hospedeId",
    ID: "hospedeId",
    NOME: "nome",
    EMAIL: "email",
    TELEFONE: "telefone",
    CPF: "cpf",
    SEXO: "sexo",
    NASCIMENTO: "dataNascimento",
    CRIADO_POR: "criadoPorId",
  } as const,
  LABEL: {
    NOME: "Nome",
    EMAIL: "Email",
    TELEFONE: "Telefone",
    CPF: "CPF",
    SEXO: "Sexo",
    NASCIMENTO: "Nascimento",
    CRIADO_POR: "Funcionário que Criou",
  },
};
