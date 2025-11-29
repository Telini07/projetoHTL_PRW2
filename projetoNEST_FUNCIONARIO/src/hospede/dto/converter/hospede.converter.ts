import { Hospede } from "src/hospede/entity/hospede.entity";
import { Funcionario } from 'src/funcionario/entity/funcionario.entity';
import { HospedeRequest } from "../request/hospede.request";
import { HospedeResponse } from "../response/hospede.response";

export class ConverterHospede{

  static toHospede(hospedeRequest: HospedeRequest){
    const hospede = new Hospede();
    if(hospedeRequest.hospedeId != null){
      hospede.hospedeId = hospedeRequest.hospedeId;
    }
    hospede.nome = hospedeRequest.nome;
    hospede.cpf = hospedeRequest.cpf;
    hospede.rg = hospedeRequest.rg;
    hospede.sexo = hospedeRequest.sexo;
    hospede.dataNascimento = hospedeRequest.dataNascimento;
    hospede.email = hospedeRequest.email;
    hospede.telefone = hospedeRequest.telefone;
    if(hospedeRequest.criadoPorId != null){
      hospede.criadoPor = new Funcionario({ funcionarioId: hospedeRequest.criadoPorId });
    }
    return hospede;
  }

  static toHospedeResponse(hospede: Hospede){
    const hospedeResponse = new HospedeResponse();
    hospedeResponse.hospedeId = hospede.hospedeId;
    hospedeResponse.nome = hospede.nome;
    hospedeResponse.cpf = hospede.cpf;
    hospedeResponse.rg = hospede.rg;
    hospedeResponse.sexo = hospede.sexo;
    hospedeResponse.dataNascimento = hospede.dataNascimento;
    hospedeResponse.email = hospede.email;
    hospedeResponse.telefone = hospede.telefone;
    hospedeResponse.criadoEm = hospede.criadoEm;
    hospedeResponse.atualizadoEm = hospede.atualizadoEm;
    hospedeResponse.criadoPorId = hospede.criadoPor?.funcionarioId;
    hospedeResponse.criadoPorNome = hospede.criadoPor?.nome;
    return hospedeResponse;
  }
}