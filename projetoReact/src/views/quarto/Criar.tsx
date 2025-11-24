import { useState } from "react";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import MensagemErro from "../../components/mensagem/MensagemErro";
import { apiPostQuarto } from "../../services/quarto/api/api.quarto";
import { QUARTO } from "../../services/quarto/constants/quarto.constants";
import type { Quarto, ErrosQuarto } from "../../services/quarto/type/Quarto";
import { ROTA } from "../../services/router/url";

export default function CriarQuarto() {
  const [model, setModel] = useState<Quarto>(QUARTO.DADOS_INCIAIS as any);

  const navigate = useNavigate();

  const [errors, setErrors] = useState<ErrosQuarto>({});

  const handleChangeField = (name: keyof Quarto, value: any) => {
    setModel((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined, [`${name}Mensagem`]: undefined }));
  };

  const validarFormulario = (): boolean => {
    const newErrors: ErrosQuarto = {};
    let isFormValid = true;

    const identificadorMessages: string[] = [];
    if (!model.identificador || String(model.identificador).trim().length === 0) {
      identificadorMessages.push("O identificador do Quarto deve ser informado");
    }
    if (identificadorMessages.length > 0) {
      newErrors.identificador = true;
      newErrors.nomeQuartoMensagem = identificadorMessages;
      isFormValid = false;
    }

    const tipoMessages: string[] = [];
    if (!model.tipo || String(model.tipo).trim().length === 0) {
      tipoMessages.push("O tipo do Quarto deve ser informado");
    }
    if (tipoMessages.length > 0) {
      newErrors.tipo = true;
      newErrors.codQuartoMensagem = tipoMessages;
      isFormValid = false;
    }

    const valorDiariaMessages: string[] = [];
    if (model.valorDiaria === undefined || model.valorDiaria === null || String(model.valorDiaria).trim() === "") {
      valorDiariaMessages.push("O valor da diária do Quarto deve ser informado");
    }
    if (valorDiariaMessages.length > 0) {
      newErrors.valorDiaria = true;
      newErrors.idQuartoMensagem = valorDiariaMessages;
      isFormValid = false;
    }

    setErrors(newErrors);
    return isFormValid;
  };

  const getInputClass = (name: keyof Quarto): string => {
    const hasErrors = (errors as Record<string, any>)[name as string];
    const baseClass = "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition";
    const errorClass = "border-red-500 focus:ring-red-300";
    const successClass = "border-amber-200 focus:ring-amber-300";
    return hasErrors ? `${baseClass} ${errorClass}` : `${baseClass} ${successClass}`;
  };

  const onSubmitForm = async (e: any) => {
    e.preventDefault();

    if (!validarFormulario()) return;
    if (!model) return;

    try {
      const payload = {
        identificador: model.identificador ?? "",
        tipo: model.tipo ?? "",
        valorDiaria: model.valorDiaria ?? 0,
        inativo: model.inativo ?? false,
      } as Quarto;

      const response = await apiPostQuarto(payload);
      console.log("Criar resposta:", response);
      navigate(ROTA.QUARTO.LISTAR);
    } catch (error: any) {
      console.log(error);
      const serverMessage = error?.response?.data || error?.message || String(error);
      alert("Erro ao criar serviço: " + JSON.stringify(serverMessage));
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-8">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 border-t-4 border-amber-600">
        <h2 className="text-3xl font-bold text-amber-900 mb-6 text-center">{QUARTO.TITULO.CRIAR}</h2>
        <form onSubmit={(e) => onSubmitForm(e)} className="space-y-5">
          <div>
            <label htmlFor={QUARTO.FIELDS.IDENTIFICADOR} className="block text-sm font-semibold text-amber-900 mb-2">
              {QUARTO.LABEL.IDENTIFICADOR}:
            </label>
            <input
              id={QUARTO.FIELDS.IDENTIFICADOR}
              name={QUARTO.FIELDS.IDENTIFICADOR}
              value={model?.identificador as any}
              className={getInputClass(QUARTO.FIELDS.IDENTIFICADOR as any)}
              autoComplete="off"
              onChange={(e) => handleChangeField(QUARTO.FIELDS.IDENTIFICADOR as any, e.target.value)}
              placeholder="Digite o identificador do quarto"
            />
            {errors.identificador && (
              <MensagemErro error={errors.identificador} mensagem={errors.nomeQuartoMensagem} />
            )}
          </div>

          <div>
            <label htmlFor={QUARTO.FIELDS.TIPO} className="block text-sm font-semibold text-amber-900 mb-2">
              {QUARTO.LABEL.TIPO}:
            </label>
            <input
              id={QUARTO.FIELDS.TIPO}
              name={QUARTO.FIELDS.TIPO}
              value={model?.tipo as any}
              className={getInputClass(QUARTO.FIELDS.TIPO as any)}
              autoComplete="off"
              onChange={(e) => handleChangeField(QUARTO.FIELDS.TIPO as any, e.target.value)}
              placeholder="Digite o tipo do quarto"
            />
            {errors.tipo && (
              <MensagemErro error={errors.tipo} mensagem={errors.codQuartoMensagem} />
            )}
          </div>

          <div>
            <label htmlFor={QUARTO.FIELDS.VALOR_DIARIA} className="block text-sm font-semibold text-amber-900 mb-2">
              {QUARTO.LABEL.VALOR_DIARIA}:
            </label>
            <input
              id={QUARTO.FIELDS.VALOR_DIARIA}
              name={QUARTO.FIELDS.VALOR_DIARIA}
              type="number"
              step="0.01"
              value={(model?.valorDiaria ?? "") as any}
              className={getInputClass(QUARTO.FIELDS.VALOR_DIARIA as any)}
              autoComplete="off"
              onChange={(e) => handleChangeField(QUARTO.FIELDS.VALOR_DIARIA as any, Number(e.target.value))}
              placeholder="R$ 0.00"
            />
            {errors.valorDiaria && (
              <MensagemErro error={errors.valorDiaria} mensagem={errors.idQuartoMensagem} />
            )}
          </div>

          <div className="flex gap-4 mt-8 pt-4 border-t border-amber-100">
            <button
              id="submit"
              type="submit"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-4 py-3 rounded-lg hover:from-amber-700 hover:to-amber-800 transition font-semibold shadow-md"
              title="Salvar novo quarto"
            >
              <FaSave />
              Salvar
            </button>
            <button
              id="cancel"
              type="button"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-400 transition font-semibold"
              onClick={() => navigate(ROTA.QUARTO.LISTAR)}
            >
              <MdCancel />
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
