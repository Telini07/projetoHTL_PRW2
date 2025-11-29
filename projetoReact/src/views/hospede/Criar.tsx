import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPostHospede } from "../../services/hospede/api/api.hospede";
import { HOSPEDE } from "../../services/hospede/constants/hospede.constants";
import type { Hospede } from "../../services/hospede/type/Hospede";

export default function CriarHospede() {
  const [form, setForm] = useState<Hospede>(HOSPEDE.DADOS_INCIAIS);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await apiPostHospede(form);
    navigate("/sistema/hospede/listar");
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Novo Hóspede</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} className="block w-full border rounded px-3 py-2" required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="block w-full border rounded px-3 py-2" required />
        <input name="telefone" placeholder="Telefone" value={form.telefone} onChange={handleChange} className="block w-full border rounded px-3 py-2" required />
        <input name="documento" placeholder="Documento" value={form.documento} onChange={handleChange} className="block w-full border rounded px-3 py-2" required />
        <button type="submit" className="bg-amber-700 text-white px-4 py-2 rounded">Salvar</button>
      </form>
    </div>
  );
}
