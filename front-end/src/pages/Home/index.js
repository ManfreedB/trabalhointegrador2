import React from "react";
import Sidebar from "../../components/Sidebar";
import Dashboard from "../../components/Dashboard";
import { Route, Routes } from "react-router-dom";
import Pagamento from "../Servicos/Cadastro";
import ListagemServicos from "../Servicos/Listagem";
import CadastroClientes from "../Clientes/Cadastro";
import ListagemClientes from "../Clientes/Listagem";
import CadastroFuncionarios from "../Funcionarios/Cadastro";
import ListagemFuncionarios from "../Funcionarios/Listagem";
import CadastroTipoServico from "../TipoServico/Cadastro";
import ListagemTipoServico from "../TipoServico/Listagem";
import "./style.css";
import ListagemPagamentos from "../Pagamento";
import ListagemEmissoesBoleto from "../Boleto";
import ListagemEmissoesNotaF from "../NotaFiscal";

function Home() {
  return (
    <div class="teste">
      <Sidebar />
      <div className="max">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="CadastroServico" element={<Pagamento />} />
          <Route path="ListagemServico" element={<ListagemServicos />} />
          <Route path="CadastroClientes" element={<CadastroClientes />} />
          <Route path="ListagemClientes" element={<ListagemClientes />} />
          <Route
            path="CadastroFuncionarios"
            element={<CadastroFuncionarios />}
          />
          <Route
            path="ListagemFuncionarios"
            element={<ListagemFuncionarios />}
          />
          <Route path="CadastroTipoServico" element={<CadastroTipoServico />} />
          <Route path="ListagemTipoServico" element={<ListagemTipoServico />} />
          <Route path="ListagemPagamento" element={<ListagemPagamentos />} />
          <Route path="ListagemEmissoesBoleto" element={<ListagemEmissoesBoleto />} />
          <Route path="ListagemEmissoesNotaF" element={<ListagemEmissoesNotaF />} />
        </Routes>
      </div>
    </div>
  );
}

export default Home;
