import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiGetHospede } from "../../services/hospede/api/api.hospede";
import type { Hospede } from "../../services/hospede/type/Hospede";

export default function ConsultarHospede() {
  const { id } = useParams<{ id: string }>();
  const [hospede, setHospede] = useState<Hospede | null>(null);

  useEffect(() => {
    if (id) {
      apiGetHospede(id).then((data: Hospede) => setHospede(data));
    }
  }, [id]);

  if (!hospede) return <div>Carregando...</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Detalhes do Hóspede</h2>
      <div className="mb-4">
        <strong>ID:</strong> {hospede.hospedeId}
      </div>
      <div className="mb-4">
        <strong>Nome:</strong> {hospede.nome}
      </div>
      <div className="mb-4">
        <strong>Email:</strong> {hospede.email}
      </div>
      <div className="mb-4">
        <strong>Telefone:</strong> {hospede.telefone}
      </div>
      <div className="mb-4">
        <strong>Documento:</strong> {hospede.documento}
      </div>
      <Link to="/sistema/hospede/listar" className="text-blue-600 hover:underline">Voltar</Link>
    </div>
  );
}
