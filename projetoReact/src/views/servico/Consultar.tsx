import { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import { apiGetServico } from "../../services/servico/api/api.servico";
import { ROTA } from "../../services/router/url";
import type { Servico } from "../../services/servico/type/Servico";
import { SERVICO } from "../../services/servico/constants/servico.constants";

export default function ConsultarServico() {
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

  const getInputClass = () => "w-full px-4 py-2 border border-amber-200 rounded-lg bg-gray-100 cursor-not-allowed";

  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-8">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 border-t-4 border-amber-600">
        <h2 className="text-3xl font-bold text-amber-900 mb-6 text-center">{SERVICO.TITULO.CONSULTAR}</h2>
        <form className="space-y-5">
          <div>
            <label htmlFor={SERVICO.FIELDS.ID} className="block text-sm font-semibold text-amber-900 mb-2">
              Código:
            </label>
            <input
              id={SERVICO.FIELDS.ID}
              name={SERVICO.FIELDS.ID}
              defaultValue={(model as any)?.servicoId || ""}
              className={getInputClass()}
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
              defaultValue={model?.nome || ""}
              className={getInputClass()}
              readOnly
              disabled
            />
          </div>
          <div>
            <label htmlFor={SERVICO.FIELDS.DESCRICAO} className="block text-sm font-semibold text-amber-900 mb-2">
              {SERVICO.LABEL.DESCRICAO}:
            </label>
            <textarea
              id={SERVICO.FIELDS.DESCRICAO}
              name={SERVICO.FIELDS.DESCRICAO}
              defaultValue={model?.descricao || ""}
              className={`w-full px-4 py-2 border border-amber-200 rounded-lg bg-gray-100 cursor-not-allowed resize-none`}
              readOnly
              disabled
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
              defaultValue={(model?.valor ?? "") as any}
              className={getInputClass()}
              readOnly
              disabled
            />
          </div>
          <div className="flex gap-4 mt-8 pt-4 border-t border-amber-100">
            <button
              id="cancel"
              type="button"
              className="w-full inline-flex items-center justify-center gap-2 bg-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-400 transition font-semibold"
              onClick={() => navigate(ROTA.SERVICO.LISTAR)}
            >
              <MdCancel />
              Voltar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
