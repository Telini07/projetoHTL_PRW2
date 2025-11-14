import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import {
  apiDeleteFuncionario,
  apiGetFuncionario,
} from "../../services/funcionario/api/api.funcionario";
import { ROTA } from "../../services/router/url";
import type { Funcionario } from "../../services/funcionario/type/Funcionario";

export default function ExcluirFuncionario() {
  const { funcionarioId } = useParams<{ funcionarioId: string }>();
  const [model, setModel] = useState<Funcionario | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getFuncionario() {
      try {
        if (funcionarioId) {
          const payload = await apiGetFuncionario(funcionarioId);
          const data = (payload && (payload as any).dados) ? (payload as any).dados : payload;
          setModel(data as Funcionario);
        }
      } catch (error: any) {
        console.log(error);
      }
    }

    getFuncionario();
  }, [funcionarioId]);

  const onSubmitForm = async (e: any) => {
    // não deixa executar o processo normal
    e.preventDefault();

    if (!funcionarioId || !model) {
      return;
    }

    try {
      const response = await apiDeleteFuncionario(funcionarioId);
      console.log("Excluir resposta:", response);
      navigate(ROTA.FUNCIONARIO.LISTAR);
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
          <p className="text-xs text-red-600 mt-1">Tem certeza que deseja excluir este funcionário?</p>
        </div>
        <h2 className="text-3xl font-bold text-red-700 mb-6 text-center">Confirmar Exclusão</h2>
        <form onSubmit={(e) => onSubmitForm(e)} className="space-y-5">
          <div>
            <label htmlFor="nome" className="block text-sm font-semibold text-amber-900 mb-2">
              Nome:
            </label>
            <input
              id="nome"
              name="nome"
              defaultValue={model?.nome || ""}
              className={getInputClass()}
              readOnly={true}
              disabled={true}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-amber-900 mb-2">
              Email:
            </label>
            <input
              id="email"
              name="email"
              defaultValue={model?.email || ""}
              className={getInputClass()}
              readOnly={true}
              disabled={true}
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
              title="Cancelar"
              onClick={() => navigate(ROTA.FUNCIONARIO.LISTAR)}
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
