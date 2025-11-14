
import { Funcionario } from "src/funcionario/entity/funcionario.entity";
import { FuncionarioRequest } from "../request/funcionario.request";
import { FuncionarioResponse } from "../response/funcionario.response";

export class ConverterFuncionario{

  static toFuncionario(funcionarioRequest: FuncionarioRequest){
    const funcionario = new Funcionario();

    if(funcionarioRequest.funcionarioId != null){ //se o id não estiver vazio
      funcionario.funcionarioId = funcionarioRequest.funcionarioId;
    }
    funcionario.nome = funcionarioRequest.nome;
    funcionario.email = funcionarioRequest.email;
    funcionario.senha = funcionarioRequest.senha;
    funcionario.ativo = funcionarioRequest.ativo;

    return funcionario;
  }

  static toFuncionarioResponse(funcionario: Funcionario){

    const funcionarioResponse = new FuncionarioResponse();
    funcionarioResponse.funcionarioId = funcionario.funcionarioId ?? 0;
    funcionarioResponse.ativo = funcionario.ativo;
    funcionarioResponse.senha = funcionario.senha;
    funcionarioResponse.email = funcionario.email;
    funcionarioResponse.nome = funcionario.nome;

    return funcionarioResponse;
  }
}