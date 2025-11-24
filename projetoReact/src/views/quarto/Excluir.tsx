import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import { apiDeleteQuarto, apiGetQuarto } from "../../services/quarto/api/api.quarto";
import { ROTA } from "../../services/router/url";
import type { Quarto } from "../../services/quarto/type/Quarto";
import { QUARTO } from "../../services/quarto/constants/quarto.constants";

export default function ExcluirQuarto() {
  const { quartoId } = useParams<{ quartoId: string }>();
  const [model, setModel] = useState<Quarto | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getQuarto() {
      try {
        if (quartoId) {
          const payload = await apiGetQuarto(quartoId);
          const data = (payload && (payload as any).dados) ? (payload as any).dados : payload;
          setModel(data as Quarto);
        }
      } catch (error: any) {
        console.log(error);
      }
    }

    getQuarto();
  }, [quartoId]);

  const onSubmitForm = async (e: any) => {
    e.preventDefault();

    if (!quartoId) return;

    try {
      const response = await apiDeleteQuarto(quartoId);
      console.log("Excluir resposta:", response);
      navigate(ROTA.QUARTO.LISTAR);
    } catch (error: any) {
      console.log(error);
    }
  };

  const getInputClass = () => "w-full px-4 py-2 border border-amber-200 rounded-lg bg-gray-100 cursor-not-allowed";

  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-8">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 border-t-4 border-red-600">
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-600 rounded">
          <p className="text-sm text-red-700 font-semibold">⚠️ Atenção: Esta ação é irreversível!</p>
          <p className="text-xs text-red-600 mt-1">Tem certeza que deseja excluir este quarto?</p>
        </div>
        <h2 className="text-3xl font-bold text-red-700 mb-6 text-center">{QUARTO.TITULO.EXCLUIR}</h2>
        <form onSubmit={(e) => onSubmitForm(e)} className="space-y-5">
          <div>
            <label htmlFor={QUARTO.FIELDS.IDENTIFICADOR} className="block text-sm font-semibold text-amber-900 mb-2">
              {QUARTO.LABEL.IDENTIFICADOR}:
            </label>
            <input
              id={QUARTO.FIELDS.IDENTIFICADOR}
              name={QUARTO.FIELDS.IDENTIFICADOR}
              defaultValue={model?.identificador || ""}
              className={getInputClass()}
              readOnly
              disabled
            />
          </div>
          <div>
            <label htmlFor={QUARTO.FIELDS.TIPO} className="block text-sm font-semibold text-amber-900 mb-2">
              {QUARTO.LABEL.TIPO}:
            </label>
            <input
              id={QUARTO.FIELDS.TIPO}
              name={QUARTO.FIELDS.TIPO}
              defaultValue={model?.tipo || ""}
              className={getInputClass()}
              readOnly
              disabled
            />
          </div>
          <div>
            <label htmlFor={QUARTO.FIELDS.VALOR_DIARIA} className="block text-sm font-semibold text-amber-900 mb-2">
              {QUARTO.LABEL.VALOR_DIARIA}:
            </label>
            <input
              id={QUARTO.FIELDS.VALOR_DIARIA}
              name={QUARTO.FIELDS.VALOR_DIARIA}
              defaultValue={model?.valorDiaria || ""}
              className={getInputClass()}
              readOnly
              disabled
            />
          </div>
          <div className="flex gap-4 mt-8 pt-4 border-t border-amber-100">
            <button
              id="submit"
              type="submit"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition font-semibold shadow-md"
              title="Confirmar exclusão"
            >
              <FaSave />
              Confirmar
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
