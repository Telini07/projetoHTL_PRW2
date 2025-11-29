import { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import { apiGetHospede } from "../../services/hospede/api/api.hospede";
import type { Hospede } from "../../services/hospede/type/Hospede";
import { ROTA } from "../../services/router/url";

export default function ConsultarHospede() {
  const { id } = useParams<{ id: string }>();
  const [hospede, setHospede] = useState<Hospede | null>(null);

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

  const navigate = useNavigate();

  const getInputClass = () => "w-full px-4 py-2 border border-amber-200 rounded-lg bg-gray-100 cursor-not-allowed";

  if (!hospede) return <div>Carregando...</div>;

  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-8">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 border-t-4 border-amber-600">
        <h2 className="text-3xl font-bold text-amber-900 mb-6 text-center">Detalhes do Hóspede</h2>
        <form className="space-y-5">
          <div>
            <label htmlFor="hospedeId" className="block text-sm font-semibold text-amber-900 mb-2">Código:</label>
            <input id="hospedeId" defaultValue={hospede.hospedeId || ''} className={getInputClass()} readOnly disabled />
          </div>
          <div>
            <label htmlFor="nome" className="block text-sm font-semibold text-amber-900 mb-2">Nome:</label>
            <input id="nome" defaultValue={hospede.nome || ''} className={getInputClass()} readOnly disabled />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-amber-900 mb-2">Email:</label>
            <input id="email" defaultValue={hospede.email || ''} className={getInputClass()} readOnly disabled />
          </div>
          <div>
            <label htmlFor="telefone" className="block text-sm font-semibold text-amber-900 mb-2">Telefone:</label>
            <input id="telefone" defaultValue={hospede.telefone || ''} className={getInputClass()} readOnly disabled />
          </div>
          <div>
            <label htmlFor="documento" className="block text-sm font-semibold text-amber-900 mb-2">Documento:</label>
            <input id="documento" defaultValue={hospede.documento || ''} className={getInputClass()} readOnly disabled />
          </div>
          <div className="flex gap-4 mt-8 pt-4 border-t border-amber-100">
            <button id="cancel" type="button" className="w-full inline-flex items-center justify-center gap-2 bg-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-400 transition font-semibold" title="Voltar" onClick={() => navigate(ROTA.HOSPEDE.LISTAR)}>
              <MdCancel /> Voltar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
