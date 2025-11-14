import { useEffect, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { apiGetFuncionarios } from "../../services/funcionario/api/api.funcionario";
import { FUNCIONARIO } from "../../services/funcionario/constants/funcionario.constants";
import type { Funcionario } from "../../services/funcionario/type/Funcionario";
import { ROTA } from "../../services/router/url";

const buscarTodosFuncionarios = async (): Promise<Funcionario[] | null> => {
  try {
    const response = await apiGetFuncionarios();
    console.log("DEBUG apiGetFuncionarios response:", response);
    const payload = response?.data ?? response;
    if (Array.isArray(payload)) return payload;
    if (payload && Array.isArray((payload as any).dados)) return (payload as any).dados;
    console.log("Formato inesperado ao buscar funcionários:", payload);
  } catch (error: any) {
    console.log("Erro ao buscar funcionários:", error);
  }
  return null;
};

export default function ListarFuncionario () {
  // useState = hook - gancho - função
  // reagir as alterações na variável
  // renderiza -
  const [models, setModels] = useState<Funcionario[]>([]);

  //hook - função - reagir, quando carregar a página
  //pela primeira vez, quando o array for vázio.
  useEffect(() => {
    async function getFuncionarios() {
      const funcionarios = await buscarTodosFuncionarios();
      console.log("DEBUG funcionarios:", funcionarios);
      if (funcionarios?.some(f => (f as any).funcionarioId === undefined)) {
        console.warn("Algum funcionário não tem ID!");
      }
      setModels(funcionarios ?? []);
    }
    getFuncionarios();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-amber-900">{FUNCIONARIO.TITULO.LISTA}</h2>
          <Link
            to="/sistema/funcionario/criar"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-lg hover:from-amber-700 hover:to-amber-800 transition font-semibold shadow-md"
          >
            <FaPlus />
            Novo Funcionário
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-amber-600">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-amber-600 to-amber-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">{FUNCIONARIO.LABEL.NOME}</th>
                  <th className="px-6 py-4 text-left font-semibold">{FUNCIONARIO.LABEL.EMAIL}</th>
                  <th className="px-6 py-4 text-center font-semibold" colSpan={3}>Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {models && models.length > 0 ? (
                  models.map((model) => (
                    <tr
                      key={model.funcionarioId}
                      className="hover:bg-amber-50 transition"
                    >
                      <td className="px-6 py-4 text-gray-700">{model.nome}</td>
                      <td className="px-6 py-4 text-gray-700">{model.email}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 justify-center flex-wrap">
                          <Link
                            to={`${ROTA.FUNCIONARIO.ATUALIZAR}/${model.funcionarioId}`}
                            className="inline-flex items-center gap-1 bg-yellow-400 text-white px-3 py-2 rounded hover:bg-yellow-500 transition text-sm font-semibold"
                          >
                            <BsPencilSquare />
                            Editar
                          </Link>
                          <Link
                            to={`${ROTA.FUNCIONARIO.EXCLUIR}/${model.funcionarioId}`}
                            className="inline-flex items-center gap-1 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition text-sm font-semibold"
                          >
                            <FaRegTrashAlt />
                            Excluir
                          </Link>
                          <Link
                            to={`${ROTA.FUNCIONARIO.POR_ID}/${model.funcionarioId}`}
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
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      <p className="text-lg">Nenhum funcionário cadastrado</p>
                      <p className="text-sm mt-2">Clique em "Novo Funcionário" para adicionar um</p>
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
