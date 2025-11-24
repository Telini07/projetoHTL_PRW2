import { http } from "../../axios/config.axios";
import { ROTA } from "../../router/url";
import type { Quarto } from "../type/Quarto";

export const apiGetQuartos = async () => {
  const response = await http.get(ROTA.QUARTO.LISTAR);
  return response.data;
};

export const apiGetQuarto = async (quartoId: string) => {
  const response = await http.get(`${ROTA.QUARTO.POR_ID}/${quartoId}`);
  return response.data;
};

export const apiPostQuarto = async (quarto: Quarto) => {
  const response = await http.post(ROTA.QUARTO.CRIAR, quarto);
  return response.data;
};

export const apiPutQuarto = async (quartoId: string, quarto: Quarto) => {
  const response = await http.put(
    `${ROTA.QUARTO.ATUALIZAR}/${quartoId}`,
    quarto,
  );
  return response.data;
};

export const apiDeleteQuarto = async (quartoId: string) => {
  const response = await http.delete(`${ROTA.QUARTO.EXCLUIR}/${quartoId}`);
  return response.data;
};
