import { criarMensagemOperacao } from "../../constant/mensagem.operacao";


const ENTITY_NAME = "Servico";

export const SERVICO = {
  ENTITY: ENTITY_NAME,

  ALIAS: "servico",

  DADOS_INCIAIS: {
    servicoId: undefined,
    nome: "",
    descricao: "",
    valor: 0,
    criadoEm: "",
    atualizadoEm: ""
  },

  FIELDS: {
    ID: "servicoId",
    NOME: "nome",
    DESCRICAO: "descricao",
    VALOR: "valor",
    CRIADO_EM: "criadoEm",
    ATUALIZADO_EM: "atualizadoEm"
  } as const,

  LABEL: {
    NOME: "Nome",
    DESCRICAO: "Descricao",
    VALOR: "Valor"
  },

  TITULO: {
    LISTA: `Lista de ${ENTITY_NAME}`,
    CRIAR: `Novo ${ENTITY_NAME}`,
    ATUALIZAR: `Atualizar ${ENTITY_NAME}`,
    EXCLUIR: `Excluir ${ENTITY_NAME}`,
    CONSULTAR: `Consultar ${ENTITY_NAME}`,
  },

  INPUT_ERROR: {
    ID: {
      BLANK: `O código de identificação do ${ENTITY_NAME} deve ser informado`,
      VALID: `Informe um código de identificação válido para ${ENTITY_NAME}`,
    },
    NOME: {
      BLANK: `O nome de ${ENTITY_NAME} deve ser informado`,
      VALID: `Informe um nome válido para ${ENTITY_NAME}`,
      MAX_LEN: `O nome de ${ENTITY_NAME} deve ter no máximo 20 caracteres`,
      MIN_LEN: `O nome de ${ENTITY_NAME} deve ter no mínimo 6 caracteres `,
      STRING: `O nome de ${ENTITY_NAME} deve ser um texto`,
    },
    DESCRICAO: {
      BLANK: `A descrição de ${ENTITY_NAME} deve ser informada`,
      STRING: `A descrição de ${ENTITY_NAME} deve ser um texto`,
    },
    VALOR: {
      BLANK: `O valor de ${ENTITY_NAME} deve ser informada`,
      VALID: `O valor deve conter apenas números`,
      MAX_LEN: `O valor de ${ENTITY_NAME} deve ter no máximo 10 caracteres`,
      NUMBER: `O valor de ${ENTITY_NAME} deve ser um número`,
    },
  },

  OPERACAO: criarMensagemOperacao(ENTITY_NAME),
};
