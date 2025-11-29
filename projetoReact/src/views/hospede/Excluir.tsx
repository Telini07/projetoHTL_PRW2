import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import { apiGetHospede, apiDeleteHospede } from "../../services/hospede/api/api.hospede";
import type { Hospede } from "../../services/hospede/type/Hospede";
import { ROTA } from "../../services/router/url";

export default function ExcluirHospede() {
  const { id } = useParams<{ id: string }>();
  const [hospede, setHospede] = useState<Hospede | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetch() {
      try {
        if (id) {
          const payload = await apiGetHospede(id);
          const data = (payload && (payload as any).dados) ? (payload as any).dados : payload;
          setHospede(data as Hospede);
        }
      } catch (error) {
        console.error('Erro ao buscar hóspede:', error);
      }
    }
    fetch();
  }, [id]);

  const onSubmitForm = async (e: any) => {
    e.preventDefault();
    if (!id) return;
    try {
      await apiDeleteHospede(id);
      navigate(ROTA.HOSPEDE.LISTAR);
    } catch (error) {
      console.error('Erro ao excluir hóspede:', error);
    }
  };

  if (!hospede) return <div>Carregando...</div>;

  const getInputClass = () => "w-full px-4 py-2 border border-amber-200 rounded-lg bg-gray-100 cursor-not-allowed";

  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-8">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 border-t-4 border-red-600">
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-600 rounded">
          <p className="text-sm text-red-700 font-semibold">⚠️ Atenção: Esta ação é irreversível!</p>
          <p className="text-xs text-red-600 mt-1">Tem certeza que deseja excluir este hóspede?</p>
        </div>
        <h2 className="text-3xl font-bold text-red-700 mb-6 text-center">Confirmar Exclusão</h2>
        <form onSubmit={(e) => onSubmitForm(e)} className="space-y-5">
          <div>
            <label htmlFor="nome" className="block text-sm font-semibold text-amber-900 mb-2">Nome:</label>
            <input id="nome" name="nome" defaultValue={hospede.nome || ''} className={getInputClass()} readOnly disabled />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-amber-900 mb-2">Email:</label>
            <input id="email" name="email" defaultValue={hospede.email || ''} className={getInputClass()} readOnly disabled />
          </div>
          <div className="flex gap-4 mt-8 pt-4 border-t border-amber-100">
            <button id="submit" type="submit" className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition font-semibold shadow-md" title="Confirmar exclusão">
              <FaSave /> Confirmar
            </button>
            <button id="cancel" type="button" className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-400 transition font-semibold" title="Cancelar" onClick={() => navigate(ROTA.HOSPEDE.LISTAR)}>
              <MdCancel /> Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
