import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import { apiGetQuarto, apiPutQuarto } from "../../services/quarto/api/api.quarto";
import { QUARTO } from "../../services/quarto/constants/quarto.constants";
import { ROTA } from "../../services/router/url";
import type { Quarto } from "../../services/quarto/type/Quarto";

export default function AlterarQuarto() {
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

  const handleChangeField = (name: keyof Quarto, value: any) => {
    setModel((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitForm = async (e: any) => {
    e.preventDefault();

    if (!quartoId || !model) return;

    try {
      const response = await apiPutQuarto(quartoId, model as Quarto);
      console.log("Alterar resposta:", response);
      navigate(ROTA.QUARTO.LISTAR);
    } catch (error: any) {
      console.log(error);
    }
  };

  const getInputClass = (disabled: boolean = false) => `w-full px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 transition ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`;

  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-8">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 border-t-4 border-amber-600">
        <h2 className="text-3xl font-bold text-amber-900 mb-6 text-center">{QUARTO.TITULO.ATUALIZAR}</h2>
        <form onSubmit={(e) => onSubmitForm(e)} className="space-y-5">
          <div>
            <label htmlFor={QUARTO.FIELDS.ID} className="block text-sm font-semibold text-amber-900 mb-2">
              Código:
            </label>
            <input
              id={QUARTO.FIELDS.ID}
              name={QUARTO.FIELDS.ID}
              value={(model as any)?.quartoId as any}
              className={getInputClass(true)}
              readOnly
              disabled
            />
          </div>

          <div>
            <label htmlFor={QUARTO.FIELDS.IDENTIFICADOR} className="block text-sm font-semibold text-amber-900 mb-2">
              {QUARTO.LABEL.IDENTIFICADOR}:
            </label>
            <input
              id={QUARTO.FIELDS.IDENTIFICADOR}
              name={QUARTO.FIELDS.IDENTIFICADOR}
              value={model?.identificador as any}
              className={getInputClass()}
              autoComplete="off"
              onChange={(e) => handleChangeField(QUARTO.FIELDS.IDENTIFICADOR as any, e.target.value)}
              placeholder="Digite o identificador do quarto"
            />
          </div>

          <div>
            <label htmlFor={QUARTO.FIELDS.TIPO} className="block text-sm font-semibold text-amber-900 mb-2">
              {QUARTO.LABEL.TIPO}:
            </label>
            <input
              id={QUARTO.FIELDS.TIPO}
              name={QUARTO.FIELDS.TIPO}
              value={model?.tipo as any}
              className={getInputClass()}
              autoComplete="off"
              onChange={(e) => handleChangeField(QUARTO.FIELDS.TIPO as any, e.target.value)}
              placeholder="Digite o tipo do quarto"
            />
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
              value={model?.valorDiaria as any}
              className={getInputClass()}
              autoComplete="off"
              onChange={(e) => handleChangeField(QUARTO.FIELDS.VALOR_DIARIA as any, Number(e.target.value))}
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
