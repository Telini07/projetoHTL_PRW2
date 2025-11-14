import { useState } from "react";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import MensagemErro from "../../components/mensagem/MensagemErro";
import { apiPostFuncionario } from "../../services/funcionario/api/api.funcionario";
import { FUNCIONARIO } from "../../services/funcionario/constants/funcionario.constants";
import type { Funcionario, ErrosFuncionario } from "../../services/funcionario/type/Funcionario";
import { ROTA } from "../../services/router/url";

export default function CriarFuncionario() {
  // hook para monitorar o estado do codigo
  // assincrono
  const [model, setModel] = useState<Funcionario>(FUNCIONARIO.DADOS_INCIAIS);

  const navigate = useNavigate();

  const [errors, setErrors] = useState<ErrosFuncionario>({});

  const handleChangeField = (name: keyof Funcionario, value: string) => {
    setModel((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
      [`${name}Mensagem`]: undefined,
    }));
  };

  const validateField = (
    name: keyof Funcionario,
    _e: React.FocusEvent<HTMLInputElement>,
  ) => {
    let messages: string[] = [];
    const value = model[name];

    switch (name) {
      case FUNCIONARIO.FIELDS.NOME:
        if (!value || String(value).trim().length === 0) {
          messages.push(FUNCIONARIO.INPUT_ERROR.NOME.BLANK);
        }
        if (String(value).length > 0 && String(value).length < 6) {
          messages.push(FUNCIONARIO.INPUT_ERROR.NOME.MIN_LEN);
        }
        if (String(value).length > 100) {
          messages.push(FUNCIONARIO.INPUT_ERROR.NOME.MAX_LEN);
        }
        break;
      case FUNCIONARIO.FIELDS.EMAIL:
        if (!value || String(value).trim().length === 0) {
          messages.push(FUNCIONARIO.INPUT_ERROR.EMAIL.BLANK);
        } else {
          const email = String(value).trim();
          if (!FUNCIONARIO.VALIDATION.EMAIL_REGEX.test(email)) {
            messages.push(FUNCIONARIO.INPUT_ERROR.EMAIL.VALID);
          }
        }
        break;
      case FUNCIONARIO.FIELDS.SENHA:
        if (!value || String(value).trim().length === 0) {
          messages.push(FUNCIONARIO.INPUT_ERROR.SENHA.BLANK);
        } else {
          const senha = String(value);
          if (senha.length < FUNCIONARIO.VALIDATION.SENHA_MIN_LEN) {
            messages.push(FUNCIONARIO.INPUT_ERROR.SENHA.MIN_LEN);
          }
          if (senha.length > FUNCIONARIO.VALIDATION.SENHA_MAX_LEN) {
            messages.push(FUNCIONARIO.INPUT_ERROR.SENHA.MAX_LEN);
          }
          if (!FUNCIONARIO.VALIDATION.SENHA_REGEX.test(senha)) {
            messages.push(FUNCIONARIO.INPUT_ERROR.SENHA.VALID);
          }
        }
        break;
    }
    setErrors((prev) => ({
      ...prev,
      [name]: messages.length > 0,
      [`${name}Mensagem`]: messages.length > 0 ? messages : undefined,
    }));
  };

  const validarFormulario = (): boolean => {
    const newErrors: ErrosFuncionario = {};
    let isFormValid = true;

    const nomeMessages = [];

    if (!model.nome || model.nome.trim().length === 0) {
      nomeMessages.push(FUNCIONARIO.INPUT_ERROR.NOME.BLANK);
    }
    if (model.nome) {
      if (model.nome.length > 0 && model.nome.length < 6) {
        nomeMessages.push(FUNCIONARIO.INPUT_ERROR.NOME.MIN_LEN);
      }
      if (model.nome.length > 100) {
        nomeMessages.push(FUNCIONARIO.INPUT_ERROR.NOME.MAX_LEN);
      }
    }
    if (nomeMessages.length > 0) {
      newErrors.nome = true;
      newErrors.nomeMensagem = nomeMessages;
      isFormValid = false;
    }

    // validação de email
    const emailFuncionarioMessages: string[] = [];
    if (!model.email || model.email.trim().length === 0) {
      emailFuncionarioMessages.push(FUNCIONARIO.INPUT_ERROR.EMAIL.BLANK);
    } else {
      const email = model.email.trim();
      if (!FUNCIONARIO.VALIDATION.EMAIL_REGEX.test(email)) {
        emailFuncionarioMessages.push(FUNCIONARIO.INPUT_ERROR.EMAIL.VALID);
      }
    }
    if (emailFuncionarioMessages.length > 0) {
      newErrors.email = true;
      newErrors.emailMensagem = emailFuncionarioMessages;
      isFormValid = false;
    }

    // validação de senha
    const senhaFuncionarioMessages: string[] = [];
    if (!model.senha || model.senha.trim().length === 0) {
      senhaFuncionarioMessages.push(FUNCIONARIO.INPUT_ERROR.SENHA.BLANK);
    } else {
      const senha = model.senha;
      if (senha.length < FUNCIONARIO.VALIDATION.SENHA_MIN_LEN) {
        senhaFuncionarioMessages.push(FUNCIONARIO.INPUT_ERROR.SENHA.MIN_LEN);
      }
      if (senha.length > FUNCIONARIO.VALIDATION.SENHA_MAX_LEN) {
        senhaFuncionarioMessages.push(FUNCIONARIO.INPUT_ERROR.SENHA.MAX_LEN);
      }
      if (!FUNCIONARIO.VALIDATION.SENHA_REGEX.test(senha)) {
        senhaFuncionarioMessages.push(FUNCIONARIO.INPUT_ERROR.SENHA.VALID);
      }
    }
    if (senhaFuncionarioMessages.length > 0) {
      newErrors.senha = true;
      newErrors.senhaMensagem = senhaFuncionarioMessages;
      isFormValid = false;
    }

    setErrors(newErrors);
    return isFormValid;
  };

  const getInputClass = (name: keyof Funcionario): string => {
    const hasErrors = (errors as Record<string, any>)[name as string];
    const baseClass = "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition";
    const errorClass = "border-red-500 focus:ring-red-300";
    const successClass = "border-amber-200 focus:ring-amber-300";
    return hasErrors ? `${baseClass} ${errorClass}` : `${baseClass} ${successClass}`;
  };

  const onSubmitForm = async (e: any) => {
    // não deixa executar o processo normal
    e.preventDefault();

    if (!validarFormulario()) {
      console.log("Erro na digitaçãod os dados ");
      return;
    }

    if (!model) {
      return;
    }

    try {
      const payload = {
        nome: model?.nome ?? "",
        email: model?.email ?? "",
        senha: model?.senha ?? "",
      };
      console.log("POST payload:", payload);
      const response = await apiPostFuncionario(payload as any);
      console.log("Criar resposta:", response);
      // navegar de volta para a lista após criar
      navigate(ROTA.FUNCIONARIO.LISTAR);
    } catch (error: any) {
      console.log(error);
      // mostrar mensagem simples ao usuário com detalhe do servidor quando disponível
      const serverMessage = error?.response?.data || error?.message || String(error);
      alert("Erro ao criar funcionário: " + JSON.stringify(serverMessage));
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-8">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 border-t-4 border-amber-600">
        <h2 className="text-3xl font-bold text-amber-900 mb-6 text-center">Novo Funcionário</h2>
        <form onSubmit={(e) => onSubmitForm(e)} className="space-y-5">
          <div>
            <label htmlFor={FUNCIONARIO.FIELDS.NOME} className="block text-sm font-semibold text-amber-900 mb-2">
              {FUNCIONARIO.LABEL.NOME}:
            </label>
            <input
              id={FUNCIONARIO.FIELDS.NOME}
              name={FUNCIONARIO.FIELDS.NOME}
              value={model?.nome}
              className={getInputClass(FUNCIONARIO.FIELDS.NOME)}
              readOnly={false}
              disabled={false}
              autoComplete="off"
              onChange={(e) =>
                handleChangeField(FUNCIONARIO.FIELDS.NOME as any, e.target.value)
              }
              onBlur={(e) => validateField(FUNCIONARIO.FIELDS.NOME, e)}
              placeholder="Digite o nome completo"
            />
            {errors.nome && (
              <MensagemErro
                error={errors.nome}
                mensagem={errors.nomeMensagem}
              />
            )}
          </div>
          <div>
            <label htmlFor={FUNCIONARIO.FIELDS.EMAIL} className="block text-sm font-semibold text-amber-900 mb-2">
              {FUNCIONARIO.LABEL.EMAIL}:
            </label>
            <input
              id={FUNCIONARIO.FIELDS.EMAIL}
              name={FUNCIONARIO.FIELDS.EMAIL}
              value={model?.email}
              className={getInputClass(FUNCIONARIO.FIELDS.EMAIL)}
              readOnly={false}
              disabled={false}
              autoComplete="off"
              onChange={(e) =>
                handleChangeField(FUNCIONARIO.FIELDS.EMAIL as any, e.target.value)
              }
              onBlur={(e) => validateField(FUNCIONARIO.FIELDS.EMAIL, e)}
              placeholder="seu.email@hotel.com"
            />
            {errors.email && (
              <MensagemErro
                error={errors.email}
                mensagem={errors.emailMensagem}
              />
            )}
          </div>
          <div>
            <label htmlFor={FUNCIONARIO.FIELDS.SENHA} className="block text-sm font-semibold text-amber-900 mb-2">
              {FUNCIONARIO.LABEL.SENHA}:
            </label>
            <input
              id={FUNCIONARIO.FIELDS.SENHA}
              name={FUNCIONARIO.FIELDS.SENHA}
              type="password"
              value={model?.senha}
              className={getInputClass(FUNCIONARIO.FIELDS.SENHA)}
              readOnly={false}
              disabled={false}
              autoComplete="off"
              onChange={(e) =>
                handleChangeField(FUNCIONARIO.FIELDS.SENHA as any, e.target.value)
              }
              onBlur={(e) => validateField(FUNCIONARIO.FIELDS.SENHA, e)}
              placeholder="Digite uma senha segura"
            />
            {errors.senha && (
              <MensagemErro
                error={errors.senha}
                mensagem={errors.senhaMensagem}
              />
            )}
          </div>
          <div className="flex gap-4 mt-8 pt-4 border-t border-amber-100">
            <button
              id="submit"
              type="submit"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-4 py-3 rounded-lg hover:from-amber-700 hover:to-amber-800 transition font-semibold shadow-md"
              title="Salvar novo funcionário"
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
