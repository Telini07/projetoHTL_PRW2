import { useEffect, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { apiGetHospedes } from "../../services/hospede/api/api.hospede";
import { HOSPEDE } from "../../services/hospede/constants/hospede.constants";
import type { Hospede } from "../../services/hospede/type/Hospede";
import { ROTA } from "../../services/router/url";

const buscarTodosHospedes = async (): Promise<Hospede[] | null> => {
  try {
    const response = await apiGetHospedes();
    const payload: unknown = response?.data ?? response;
    if (Array.isArray(payload)) return payload;
    if (
      payload &&
      typeof payload === "object" &&
      Array.isArray((payload as { dados?: unknown[] }).dados)
    ) {
      return (payload as { dados: Hospede[] }).dados;
    }
  } catch (error) {
    console.log("Erro ao buscar hóspedes:", error);
  }
  return null;
};

export default function ListarHospede() {
  const [models, setModels] = useState<Hospede[]>([]);

  useEffect(() => {
    async function getHospedes() {
      const hospedes = await buscarTodosHospedes();
      setModels(hospedes ?? []);
    }
    getHospedes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-amber-900">Lista de Hóspedes</h2>
          <Link
            to={ROTA.HOSPEDE.CRIAR}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-lg hover:from-amber-700 hover:to-amber-800 transition font-semibold shadow-md"
          >
            <FaPlus />
            Novo Hóspede
          </Link>
        </div>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-amber-600">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-amber-600 to-amber-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">{HOSPEDE.LABEL.NOME}</th>
                  <th className="px-6 py-4 text-left font-semibold">{HOSPEDE.LABEL.EMAIL}</th>
                  <th className="px-6 py-4 text-left font-semibold">{HOSPEDE.LABEL.TELEFONE}</th>
                  <th className="px-6 py-4 text-left font-semibold">{HOSPEDE.LABEL.DOCUMENTO}</th>
                  <th className="px-6 py-4 text-center font-semibold" colSpan={3}>Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {models && models.length > 0 ? (
                  models.map((model) => (
                    <tr
                      key={model.hospedeId}
                      className="hover:bg-amber-50 transition"
                    >
                      <td className="px-6 py-4 text-gray-700">{model.nome}</td>
                      <td className="px-6 py-4 text-gray-700">{model.email}</td>
                      <td className="px-6 py-4 text-gray-700">{model.telefone}</td>
                      <td className="px-6 py-4 text-gray-700">{model.documento}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 justify-center flex-wrap">
                          <Link
                            to={`${ROTA.HOSPEDE.ATUALIZAR}/${model.hospedeId}`}
                            className="inline-flex items-center gap-1 bg-yellow-400 text-white px-3 py-2 rounded hover:bg-yellow-500 transition text-sm font-semibold"
                          >
                            <BsPencilSquare />
                            Editar
                          </Link>
                          <Link
                            to={`${ROTA.HOSPEDE.EXCLUIR}/${model.hospedeId}`}
                            className="inline-flex items-center gap-1 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition text-sm font-semibold"
                          >
                            <FaRegTrashAlt />
                            Excluir
                          </Link>
                          <Link
                            to={`${ROTA.HOSPEDE.POR_ID}/${model.hospedeId}`}
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
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      <p className="text-lg">Nenhum hóspede cadastrado</p>
                      <p className="text-sm mt-2">Clique em "Novo Hóspede" para adicionar um</p>
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
