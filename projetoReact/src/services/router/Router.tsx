import type { RouteObject } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Dashboard from "../../views/Dashboard";
import AlterarFuncionario from "../../views/funcionario/Alterar";
import ConsultarFuncionario from "../../views/funcionario/Consultar";
import CriarFuncionario from "../../views/funcionario/Criar";
import ExcluirFuncionario from "../../views/funcionario/Excluir";
import ListarFuncionario from "../../views/funcionario/Listar";
import AlterarServico from "../../views/servico/Alterar";
import ConsultarServico from "../../views/servico/Consultar";
import CriarServico from "../../views/servico/Criar";
import ExcluirServico from "../../views/servico/Excluir";
import ListarServico from "../../views/servico/Listar";
import AlterarQuarto from "../../views/quarto/Alterar";
import ConsultarQuarto from "../../views/quarto/Consultar";
import CriarQuarto from "../../views/quarto/Criar";
import ExcluirQuarto from "../../views/quarto/Excluir";
import ListarQuarto from "../../views/quarto/Listar";
import { ROTA } from "./url";

//localhost:3000/sistema/cidade/listar

export const routes: RouteObject[] = [
  {
    path: "/sistema",
    element: <Layout />, // componente (pai)
    children: [
      {
        path: "/sistema/dashboard", //url
        element: <Dashboard />, //componente a ser carregado (filho)
      },
      {
        path: ROTA.FUNCIONARIO.LISTAR,
        element: <ListarFuncionario />,
      },
      {
        path: ROTA.FUNCIONARIO.CRIAR,
        element: <CriarFuncionario />,
      },
      {
        path: `${ROTA.FUNCIONARIO.ATUALIZAR}/:funcionarioId`,
        element: <AlterarFuncionario />,
      },
      {
        path: `${ROTA.FUNCIONARIO.EXCLUIR}/:funcionarioId`,
        element: <ExcluirFuncionario />,
      },
      {
        path: `${ROTA.FUNCIONARIO.POR_ID}/:funcionarioId`,
        element: <ConsultarFuncionario />,
      },
      // Rotas para Servico
      {
        path: ROTA.SERVICO.LISTAR,
        element: <ListarServico />,
      },
      {
        path: ROTA.SERVICO.CRIAR,
        element: <CriarServico />,
      },
      {
        path: `${ROTA.SERVICO.ATUALIZAR}/:servicoId`,
        element: <AlterarServico />,
      },
      {
        path: `${ROTA.SERVICO.EXCLUIR}/:servicoId`,
        element: <ExcluirServico />,
      },
      {
        path: `${ROTA.SERVICO.POR_ID}/:servicoId`,
        element: <ConsultarServico />,
      },
      // Rotas para Quarto
      {
        path: ROTA.QUARTO.LISTAR,
        element: <ListarQuarto />,
      },
      {
        path: ROTA.QUARTO.CRIAR,
        element: <CriarQuarto />,
      },
      {
        path: `${ROTA.QUARTO.ATUALIZAR}/:quartoId`,
        element: <AlterarQuarto />,
      },
      {
        path: `${ROTA.QUARTO.EXCLUIR}/:quartoId`,
        element: <ExcluirQuarto />,
      },
      {
        path: `${ROTA.QUARTO.POR_ID}/:quartoId`,
        element: <ConsultarQuarto />,
      },
    ],
  },
];
