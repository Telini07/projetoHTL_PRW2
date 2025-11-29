import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGetHospede, apiDeleteHospede } from "../../services/hospede/api/api.hospede";
import type { Hospede } from "../../services/hospede/type/Hospede";

export default function ExcluirHospede() {
  const { id } = useParams<{ id: string }>();
  const [hospede, setHospede] = useState<Hospede | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      apiGetHospede(id).then((data: Hospede) => setHospede(data));
    }
  }, [id]);

  const handleDelete = async () => {
    if (id) {
      await apiDeleteHospede(id);
      navigate("/sistema/hospede/listar");
    }
  };

  if (!hospede) return <div>Carregando...</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Excluir Hóspede</h2>
      <p>Tem certeza que deseja excluir o hóspede <strong>{hospede.nome}</strong>?</p>
      <div className="mt-4">
        <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded mr-2">Excluir</button>
        <button onClick={() => navigate("/sistema/hospede/listar")}
          className="bg-gray-400 text-white px-4 py-2 rounded">Cancelar</button>
      </div>
    </div>
  );
}
