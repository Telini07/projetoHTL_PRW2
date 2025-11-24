import { useEffect, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { apiGetQuartos } from "../../services/quarto/api/api.quarto";
import { QUARTO } from "../../services/quarto/constants/quarto.constants";
import type { Quarto } from "../../services/quarto/type/Quarto";
import { ROTA } from "../../services/router/url";

const buscarTodosQuartos = async (): Promise<Quarto[] | null> => {
  try {
    const response = await apiGetQuartos();
    const payload = response?.data ?? response;
    if (Array.isArray(payload)) return payload;
    if (payload && Array.isArray((payload as any).dados)) return (payload as any).dados;
  } catch (error: any) {
    console.log("Erro ao buscar quartos:", error);
  }
  return null;
};

export default function ListarQuarto() {
  const [models, setModels] = useState<Quarto[]>([]);

  useEffect(() => {
    async function getQuartos() {
      const quartos = await buscarTodosQuartos();
      setModels(quartos ?? []);
    }
    getQuartos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-amber-900">{QUARTO.TITULO.LISTA}</h2>
          <Link
            to={ROTA.QUARTO.CRIAR}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-lg hover:from-amber-700 hover:to-amber-800 transition font-semibold shadow-md"
          >
            <FaPlus />
            Novo Quarto
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-amber-600">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-amber-600 to-amber-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">{QUARTO.LABEL.IDENTIFICADOR}</th>
                  <th className="px-6 py-4 text-left font-semibold">{QUARTO.LABEL.TIPO}</th>
                  <th className="px-6 py-4 text-left font-semibold">{QUARTO.LABEL.VALOR_DIARIA}</th>
                  <th className="px-6 py-4 text-center font-semibold" colSpan={3}>Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {models && models.length > 0 ? (
                  models.map((model) => (
                    <tr
                      key={(model as any).quartoId}
                      className="hover:bg-amber-50 transition"
                    >
                      <td className="px-6 py-4 text-gray-700">{(model as any).identificador}</td>
                      <td className="px-6 py-4 text-gray-700">{(model as any).tipo}</td>
                      <td className="px-6 py-4 text-gray-700 font-semibold">R$ {(model as any).valorDiaria?.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 justify-center flex-wrap">
                          <Link
                            to={`${ROTA.QUARTO.ATUALIZAR}/${(model as any).quartoId}`}
                            className="inline-flex items-center gap-1 bg-yellow-400 text-white px-3 py-2 rounded hover:bg-yellow-500 transition text-sm font-semibold"
                          >
                            <BsPencilSquare />
                            Editar
                          </Link>
                          <Link
                            to={`${ROTA.QUARTO.EXCLUIR}/${(model as any).quartoId}`}
                            className="inline-flex items-center gap-1 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition text-sm font-semibold"
                          >
                            <FaRegTrashAlt />
                            Excluir
                          </Link>
                          <Link
                            to={`${ROTA.QUARTO.POR_ID}/${(model as any).quartoId}`}
                            className="inline-flex items-center gap-1 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition text-sm font-semibold"
                          >
                            <FaMagnifyingGlass />
                            Ver
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      <p className="text-lg">Nenhum quarto cadastrado</p>
                      <p className="text-sm mt-2">Clique em "Novo Quarto" para adicionar um</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
