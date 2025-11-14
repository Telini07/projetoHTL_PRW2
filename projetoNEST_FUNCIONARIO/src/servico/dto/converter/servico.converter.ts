
import { Servico } from "src/servico/entity/servico.entity";
import { ServicoRequest } from "../request/servico.request";
import { ServicoResponse } from "../response/servico.response";

export class ConverterServico{

  static toServico(servicoRequest: ServicoRequest){
    const servico = new Servico();

    if(servicoRequest.servicoId != null){ //se o id não estiver vazio
      servico.servicoId = servicoRequest.servicoId;
    }
    servico.nome = servicoRequest.nome;
    servico.descricao = servicoRequest.descricao;
    servico.valor = servicoRequest.valor;
    servico.criadoEm = servicoRequest.criadoEm;
    servico.atualizadoEm = servicoRequest.atualizadoEm;

    return servico;
  }

  static toServicoResponse(servico: Servico){

    const servicoResponse = new ServicoResponse();
    servicoResponse.servicoId = servico.servicoId ?? 0;
    servicoResponse.atualizadoEm = servico.atualizadoEm;
    servicoResponse.criadoEm = servico.criadoEm;
    servicoResponse.valor = servico.valor;
    servicoResponse.descricao = servico.descricao;
    servicoResponse.nome = servico.nome;

    return servicoResponse;
  }
}