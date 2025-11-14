import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import { apiGetServico, apiPutServico } from "../../services/servico/api/api.servico";
import { SERVICO } from "../../services/servico/constants/servico.constants";
import { ROTA } from "../../services/router/url";
import type { Servico } from "../../services/servico/type/Servico";

export default function AlterarServico() {
  const { servicoId } = useParams<{ servicoId: string }>();
  const [model, setModel] = useState<Servico | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getServico() {
      try {
        if (servicoId) {
          const payload = await apiGetServico(servicoId);
          const data = (payload && (payload as any).dados) ? (payload as any).dados : payload;
          setModel(data as Servico);
        }
      } catch (error: any) {
        console.log(error);
      }
    }

    getServico();
  }, [servicoId]);

  const handleChangeField = (name: keyof Servico, value: any) => {
    setModel((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitForm = async (e: any) => {
    e.preventDefault();

    if (!servicoId || !model) return;

    try {
      const response = await apiPutServico(servicoId, model as Servico);
      console.log("Alterar resposta:", response);
      navigate(ROTA.SERVICO.LISTAR);
    } catch (error: any) {
      console.log(error);
    }
  };

  const getInputClass = (disabled: boolean = false) => `w-full px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 transition ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`;

  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-8">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 border-t-4 border-amber-600">
        <h2 className="text-3xl font-bold text-amber-900 mb-6 text-center">{SERVICO.TITULO.ATUALIZAR}</h2>
        <form onSubmit={(e) => onSubmitForm(e)} className="space-y-5">
          <div>
            <label htmlFor={SERVICO.FIELDS.ID} className="block text-sm font-semibold text-amber-900 mb-2">
              Código:
            </label>
            <input
              id={SERVICO.FIELDS.ID}
              name={SERVICO.FIELDS.ID}
              value={(model as any)?.servicoId as any}
              className={getInputClass(true)}
              readOnly
              disabled
            />
          </div>

          <div>
            <label htmlFor={SERVICO.FIELDS.NOME} className="block text-sm font-semibold text-amber-900 mb-2">
              {SERVICO.LABEL.NOME}:
            </label>
            <input
              id={SERVICO.FIELDS.NOME}
              name={SERVICO.FIELDS.NOME}
              value={model?.nome as any}
              className={getInputClass()}
              autoComplete="off"
              onChange={(e) => handleChangeField(SERVICO.FIELDS.NOME as any, e.target.value)}
              placeholder="Digite o nome do serviço"
            />
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
              value={model?.valor as any}
              className={getInputClass()}
              autoComplete="off"
              onChange={(e) => handleChangeField(SERVICO.FIELDS.VALOR as any, Number(e.target.value))}
              placeholder="R$ 0.00"
            />
          </div>

          <div className="flex gap-4 mt-8 pt-4 border-t border-amber-100">
            <button
              id="submit"
              type="submit"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-4 py-3 rounded-lg hover:from-amber-700 hover:to-amber-800 transition font-semibold shadow-md"
              title="Salvar alterações"
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
