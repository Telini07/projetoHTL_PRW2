import { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import { apiGetFuncionario } from "../../services/funcionario/api/api.funcionario";
import { ROTA } from "../../services/router/url";
import type { Funcionario } from "../../services/funcionario/type/Funcionario";

export default function ConsultarFuncionario() {
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

  const getInputClass = () => "w-full px-4 py-2 border border-amber-200 rounded-lg bg-gray-100 cursor-not-allowed";

  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-8">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 border-t-4 border-amber-600">
        <h2 className="text-3xl font-bold text-amber-900 mb-6 text-center">Consultar Funcionário</h2>
        <form className="space-y-5">
          <div>
            <label htmlFor="funcionarioId" className="block text-sm font-semibold text-amber-900 mb-2">
              Código:
            </label>
            <input
              id="funcionarioId"
              name="funcionarioId"
              defaultValue={model?.funcionarioId || ""}
              className={getInputClass()}
              readOnly={true}
              disabled={true}
            />
          </div>
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
              id="cancel"
              type="button"
              className="w-full inline-flex items-center justify-center gap-2 bg-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-400 transition font-semibold"
              title="Voltar"
              onClick={() => navigate(ROTA.FUNCIONARIO.LISTAR)}
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
