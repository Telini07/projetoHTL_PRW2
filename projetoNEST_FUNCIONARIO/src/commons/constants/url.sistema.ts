import { FUNCIONARIO } from './constants.sistema';
import { SERVICO } from './constants.sistema';
import { QUARTO } from './constants.sistema';

export const SERVIDOR = 'http://localhost:8000';
export const CLINTE = 'http://localhost:3000';

const ROTA_SISTEMA = 'rest/sistema';
const ROTA_AUTH = 'rest/auth';

const LIST = 'listar';
const CREATE = 'criar';
const BY_ID = 'buscar';
const UPDATE = 'alterar';
const DELETE = 'excluir';

function gerarRotasSistema(entity: string) {
  const base = `/${ROTA_SISTEMA}/${entity}`;
  return {
    BASE: base,
    LIST: `/${LIST}`,
    CREATE: `/${CREATE}`,
    BY_ID: `/${BY_ID}/:id`,
    UPDATE: `/${UPDATE}/:id`,
    DELETE: `/${DELETE}/:id`,
  };
}

export const ROUTE = {
  FUNCIONARIO: gerarRotasSistema(FUNCIONARIO),
  SERVICO: gerarRotasSistema(SERVICO),
  QUARTO: gerarRotasSistema(QUARTO),
};

//criar rotas de forma dinâmica para os endpoints
//recurso, URLs, URI....
// concatenar = '/rest/sistema/cidade/buscar/:id'
