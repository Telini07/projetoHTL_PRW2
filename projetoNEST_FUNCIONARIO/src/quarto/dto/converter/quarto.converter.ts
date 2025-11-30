import { Quarto } from "src/quarto/entity/quarto.entity";
import { QuartoRequest } from "../request/quarto.request";
import { QuartoResponse } from "../response/quarto.response";

export class ConverterQuarto{

  static toQuarto(quartoRequest: QuartoRequest){
    const quarto = new Quarto();

    // Only set quartoId when it's a positive number (avoid setting empty string or zero)
    if (quartoRequest.quartoId != null && Number(quartoRequest.quartoId) > 0) {
      quarto.quartoId = Number(quartoRequest.quartoId);
    }
    quarto.identificador = quartoRequest.identificador;
    quarto.tipo = quartoRequest.tipo;
    quarto.valorDiaria = quartoRequest.valorDiaria;
    quarto.inativo = quartoRequest.inativo;

    return quarto;
  }

  // Fiz isso para não mexer no quartoId e não passar chaves undefined
  static toPartial(quartoRequest: QuartoRequest): Partial<Quarto> {
    const patch: Partial<Quarto> = {};

    if (quartoRequest.identificador !== undefined) {
      patch.identificador = quartoRequest.identificador;
    }
    if (quartoRequest.tipo !== undefined) {
      patch.tipo = quartoRequest.tipo;
    }
    if (quartoRequest.valorDiaria !== undefined) {
      patch.valorDiaria = quartoRequest.valorDiaria;
    }
    if (quartoRequest.inativo !== undefined) {
      patch.inativo = quartoRequest.inativo;
    }
    
    return patch;
  }

  static toQuartoResponse(quarto: Quarto){

    const quartoResponse = new QuartoResponse();
    quartoResponse.quartoId = quarto.quartoId ?? 0;
    quartoResponse.identificador = quarto.identificador;
    quartoResponse.tipo = quarto.tipo;
    quartoResponse.valorDiaria = quarto.valorDiaria;
    quartoResponse.inativo = quarto.inativo;

    return quartoResponse;
  }
}