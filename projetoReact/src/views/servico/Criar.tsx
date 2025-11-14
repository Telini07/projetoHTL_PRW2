import { useState } from "react";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import MensagemErro from "../../components/mensagem/MensagemErro";
import { apiPostServico } from "../../services/servico/api/api.servico";
import { SERVICO } from "../../services/servico/constants/servico.constants";
import type { Servico, ErrosServico } from "../../services/servico/type/Servico";
import { ROTA } from "../../services/router/url";

export default function CriarServico() {
  const [model, setModel] = useState<Servico>(SERVICO.DADOS_INCIAIS as any);

  const navigate = useNavigate();

  const [errors, setErrors] = useState<ErrosServico>({});

  const handleChangeField = (name: keyof Servico, value: any) => {
    setModel((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined, [`${name}Mensagem`]: undefined }));
  };

  const validarFormulario = (): boolean => {
    const newErrors: ErrosServico = {};
    let isFormValid = true;

    const nomeMessages: string[] = [];
    if (!model.nome || String(model.nome).trim().length === 0) {
      nomeMessages.push(SERVICO.INPUT_ERROR.NOME.BLANK);
    }
    if (model.nome && String(model.nome).length > 0 && String(model.nome).length < 6) {
      nomeMessages.push(SERVICO.INPUT_ERROR.NOME.MIN_LEN);
    }
    if (nomeMessages.length > 0) {
      newErrors.nome = true;
      newErrors.nomeMensagem = nomeMessages;
      isFormValid = false;
    }

    const valorMessages: string[] = [];
    if (model.valor === undefined || model.valor === null || String(model.valor).trim() === "") {
      valorMessages.push(SERVICO.INPUT_ERROR.VALOR.BLANK);
    }
    if (valorMessages.length > 0) {
      newErrors.valor = true;
      newErrors.valorMensagem = valorMessages;
      isFormValid = false;
    }

    setErrors(newErrors);
    return isFormValid;
  };

  const getInputClass = (name: keyof Servico): string => {
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
        nome: model.nome ?? "",
        descricao: model.descricao ?? "",
        valor: model.valor ?? 0,
      } as Servico;

      const response = await apiPostServico(payload);
      console.log("Criar resposta:", response);
      navigate(ROTA.SERVICO.LISTAR);
    } catch (error: any) {
      console.log(error);
      const serverMessage = error?.response?.data || error?.message || String(error);
      alert("Erro ao criar serviço: " + JSON.stringify(serverMessage));
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-8">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 border-t-4 border-amber-600">
        <h2 className="text-3xl font-bold text-amber-900 mb-6 text-center">{SERVICO.TITULO.CRIAR}</h2>
        <form onSubmit={(e) => onSubmitForm(e)} className="space-y-5">
          <div>
            <label htmlFor={SERVICO.FIELDS.NOME} className="block text-sm font-semibold text-amber-900 mb-2">
              {SERVICO.LABEL.NOME}:
            </label>
            <input
              id={SERVICO.FIELDS.NOME}
              name={SERVICO.FIELDS.NOME}
              value={model?.nome as any}
              className={getInputClass(SERVICO.FIELDS.NOME as any)}
              autoComplete="off"
              onChange={(e) => handleChangeField(SERVICO.FIELDS.NOME as any, e.target.value)}
              placeholder="Digite o nome do serviço"
            />
            {errors.nome && (
              <MensagemErro error={errors.nome} mensagem={errors.nomeMensagem} />
            )}
          </div>

          <div>
            <label htmlFor={SERVICO.FIELDS.DESCRICAO} className="block text-sm font-semibold text-amber-900 mb-2">
              {SERVICO.LABEL.DESCRICAO}:
            </label>
            <textarea
              id={SERVICO.FIELDS.DESCRICAO}
              name={SERVICO.FIELDS.DESCRICAO}
              value={model?.descricao as any}
              className={`w-full px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 transition resize-none`}
              autoComplete="off"
              onChange={(e) => handleChangeField(SERVICO.FIELDS.DESCRICAO as any, e.target.value)}
              placeholder="Descreva o serviço"
              rows={4}
            />
          </div>

          <div>
            <label htmlFor={SERVICO.FIELDS.VALOR} className="block text-sm font-semibold text-amber-900 mb-2">
              {SERVICO.LABEL.VALOR}:
            </label>
            <input
              id={SERVICO.FIELDS.VALOR}
              name={SERVICO.FIELDS.VALOR}
              type="number"
              step="0.01"
              value={(model?.valor ?? "") as any}
              className={getInputClass(SERVICO.FIELDS.VALOR as any)}
              autoComplete="off"
              onChange={(e) => handleChangeField(SERVICO.FIELDS.VALOR as any, Number(e.target.value))}
              placeholder="R$ 0.00"
            />
            {errors.valor && (
              <MensagemErro error={errors.valor} mensagem={errors.valorMensagem} />
            )}
          </div>

          <div className="flex gap-4 mt-8 pt-4 border-t border-amber-100">
            <button
              id="submit"
              type="submit"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-4 py-3 rounded-lg hover:from-amber-700 hover:to-amber-800 transition font-semibold shadow-md"
              title="Salvar novo serviço"
            >
              <FaSave />
              Salvar
            </button>
            <button
              id="cancel"
              type="button"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-400 transition font-semibold"
              onClick={() => navigate(ROTA.SERVICO.LISTAR)}
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
