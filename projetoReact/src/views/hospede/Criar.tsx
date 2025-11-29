import { useState } from "react";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import MensagemErro from "../../components/mensagem/MensagemErro";
import { apiPostHospede } from "../../services/hospede/api/api.hospede";
import { HOSPEDE } from "../../services/hospede/constants/hospede.constants";
import type { Hospede, ErrosHospede } from "../../services/hospede/type/Hospede";
import { ROTA } from "../../services/router/url";

export default function CriarHospede() {
  const [model, setModel] = useState<Hospede>(HOSPEDE.DADOS_INCIAIS);
  const [errors, setErrors] = useState<ErrosHospede>({});
  const navigate = useNavigate();

  const handleChangeField = (name: keyof Hospede, value: string) => {
    setModel((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined, [`${name}Mensagem`]: undefined }));
  };

  const validateField = (name: keyof Hospede) => {
    const messages: string[] = [];
    const value = (model as any)[name];
    if (name === HOSPEDE.FIELDS.NOME && (!value || String(value).trim().length === 0)) {
      messages.push('Nome é obrigatório');
    }
    if (name === HOSPEDE.FIELDS.EMAIL && (!value || String(value).trim().length === 0)) {
      messages.push('Email é obrigatório');
    }
    setErrors((prev) => ({ ...prev, [name]: messages.length > 0, [`${name}Mensagem`]: messages.length > 0 ? messages : undefined }));
  };

  const getInputClass = (name: keyof Hospede): string => {
    const hasErrors = (errors as Record<string, any>)[name as string];
    const baseClass = "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition";
    const errorClass = "border-red-500 focus:ring-red-300";
    const successClass = "border-amber-200 focus:ring-amber-300";
    return hasErrors ? `${baseClass} ${errorClass}` : `${baseClass} ${successClass}`;
  };

  const onSubmitForm = async (e: any) => {
    e.preventDefault();
    // validate
    validateField(HOSPEDE.FIELDS.NOME as any);
    validateField(HOSPEDE.FIELDS.EMAIL as any);
    // simple check
    if ((errors.nome || errors.email) as any) {
      return;
    }
    try {
      await apiPostHospede(model);
      navigate(ROTA.HOSPEDE.LISTAR);
    } catch (error: any) {
      const serverMessage = error?.response?.data || error?.message || String(error);
      alert("Erro ao criar hóspede: " + JSON.stringify(serverMessage));
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-8">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 border-t-4 border-amber-600">
        <h2 className="text-3xl font-bold text-amber-900 mb-6 text-center">Novo Hóspede</h2>
        <form onSubmit={(e) => onSubmitForm(e)} className="space-y-5">
          <div>
            <label htmlFor={HOSPEDE.FIELDS.NOME} className="block text-sm font-semibold text-amber-900 mb-2">{HOSPEDE.LABEL.NOME}:</label>
            <input id={HOSPEDE.FIELDS.NOME} name={HOSPEDE.FIELDS.NOME} value={model?.nome} className={getInputClass(HOSPEDE.FIELDS.NOME as any)} autoComplete="off" onChange={(e) => handleChangeField(HOSPEDE.FIELDS.NOME as any, e.target.value)} onBlur={() => validateField(HOSPEDE.FIELDS.NOME as any)} placeholder="Nome completo" />
            {errors.nome && <MensagemErro error={errors.nome} mensagem={errors.nomeMensagem} />}
          </div>
          <div>
            <label htmlFor={HOSPEDE.FIELDS.EMAIL} className="block text-sm font-semibold text-amber-900 mb-2">{HOSPEDE.LABEL.EMAIL}:</label>
            <input id={HOSPEDE.FIELDS.EMAIL} name={HOSPEDE.FIELDS.EMAIL} value={model?.email} className={getInputClass(HOSPEDE.FIELDS.EMAIL as any)} autoComplete="off" onChange={(e) => handleChangeField(HOSPEDE.FIELDS.EMAIL as any, e.target.value)} onBlur={() => validateField(HOSPEDE.FIELDS.EMAIL as any)} placeholder="seu.email@hotel.com" />
            {errors.email && <MensagemErro error={errors.email} mensagem={errors.emailMensagem} />}
          </div>
          <div>
            <label htmlFor={HOSPEDE.FIELDS.TELEFONE} className="block text-sm font-semibold text-amber-900 mb-2">{HOSPEDE.LABEL.TELEFONE}:</label>
            <input id={HOSPEDE.FIELDS.TELEFONE} name={HOSPEDE.FIELDS.TELEFONE} value={model?.telefone} className={getInputClass(HOSPEDE.FIELDS.TELEFONE as any)} autoComplete="off" onChange={(e) => handleChangeField(HOSPEDE.FIELDS.TELEFONE as any, e.target.value)} placeholder="(21) 99999-9999" />
          </div>
          <div>
            <label htmlFor={HOSPEDE.FIELDS.DOCUMENTO} className="block text-sm font-semibold text-amber-900 mb-2">{HOSPEDE.LABEL.DOCUMENTO}:</label>
            <input id={HOSPEDE.FIELDS.DOCUMENTO} name={HOSPEDE.FIELDS.DOCUMENTO} value={model?.documento} className={getInputClass(HOSPEDE.FIELDS.DOCUMENTO as any)} autoComplete="off" onChange={(e) => handleChangeField(HOSPEDE.FIELDS.DOCUMENTO as any, e.target.value)} placeholder="CPF ou RG" />
          </div>
          <div className="flex gap-4 mt-8 pt-4 border-t border-amber-100">
            <button id="submit" type="submit" className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-4 py-3 rounded-lg hover:from-amber-700 hover:to-amber-800 transition font-semibold shadow-md" title="Salvar novo hóspede"><FaSave/> Salvar</button>
            <button id="cancel" type="button" className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-400 transition font-semibold" title="Cancelar" onClick={()=>navigate(ROTA.HOSPEDE.LISTAR)}><MdCancel/> Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
