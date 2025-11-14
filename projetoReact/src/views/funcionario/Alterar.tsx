import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import {
  apiGetFuncionario,
  apiPutFuncionario,
} from "../../services/funcionario/api/api.funcionario";
import { FUNCIONARIO } from "../../services/funcionario/constants/funcionario.constants";
import { ROTA } from "../../services/router/url";
import type { Funcionario } from "../../services/funcionario/type/Funcionario";

export default function AlterarFuncionario() {
  const { funcionarioId } = useParams<{ funcionarioId: string }>();
  const [model, setModel] = useState<Funcionario | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getFuncionario() {
      try {
        if (funcionarioId) {
          const payload = await apiGetFuncionario(funcionarioId);
          const data = (payload && (payload as any).dados) ? (payload as any).dados : payload;
          console.log(data);
          setModel(data as Funcionario);
        }
      } catch (error: any) {
        console.log(error);
      }
    }

    getFuncionario();
  }, [funcionarioId]);

  const handleChangeField = (name: keyof Funcionario, value: string) => {
    setModel((prev) => ({ ...prev, [name]: value }));
    console.log(model);
  };

  const onSubmitForm = async (e: any) => {
    // não deixa executar o processo normal
    e.preventDefault();

    if (!funcionarioId || !model) {
      return;
    }

    try {
      const response = await apiPutFuncionario(funcionarioId, model);
      console.log("Alterar resposta:", response);
      navigate(ROTA.FUNCIONARIO.LISTAR);
    } catch (error: any) {
      console.log(error);
    }
  };

  const getInputClass = () => "w-full px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 transition";

  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-8">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 border-t-4 border-amber-600">
        <h2 className="text-3xl font-bold text-amber-900 mb-6 text-center">Alterar Funcionário</h2>
        <form onSubmit={(e) => onSubmitForm(e)} className="space-y-5">
          <div>
            <label htmlFor="funcionarioId" className="block text-sm font-semibold text-amber-900 mb-2">
              Código:
            </label>
            <input
              id="funcionarioId"
              name="funcionarioId"
              value={model?.funcionarioId as any}
              className={`${getInputClass()} bg-gray-100`}
              readOnly={true}
              disabled={true}
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor={FUNCIONARIO.FIELDS.NOME} className="block text-sm font-semibold text-amber-900 mb-2">
              Nome:
            </label>
            <input
              id="nome"
              name="nome"
              value={model?.nome || ""}
              className={getInputClass()}
              readOnly={false}
              disabled={false}
              autoComplete="off"
              onChange={(e) =>
                handleChangeField(FUNCIONARIO.FIELDS.NOME as any, e.target.value)
              }
              placeholder="Digite o nome completo"
            />
          </div>
          <div>
            <label htmlFor={FUNCIONARIO.FIELDS.EMAIL} className="block text-sm font-semibold text-amber-900 mb-2">
              Email:
            </label>
            <input
              id="email"
              name="email"
              value={model?.email || ""}
              className={getInputClass()}
              readOnly={false}
              disabled={false}
              autoComplete="off"
              onChange={(e) =>
                handleChangeField(FUNCIONARIO.FIELDS.EMAIL as any, e.target.value)
              }
              placeholder="seu.email@hotel.com"
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
