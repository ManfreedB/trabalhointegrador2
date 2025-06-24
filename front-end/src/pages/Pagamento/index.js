import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./style.css";

const ListagemPagamentos = () => {
  const [filtro, setFiltro] = useState("todos");
  const [pagamento, setPagamento] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPagamentos = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://integrador-backend.herokuapp.com/relatorio/pagamentos", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setPagamento(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPagamentos();
  }, []);

  const pagamentosFiltrados =
    filtro === "todos"
      ? pagamento
      : pagamento.filter((pagamento) => {
        if (filtro === "pago" && pagamento.datafechado !== null) return true;
        if (filtro === "pendente" && pagamento.datafechado === null) return true;
        return false;
      });

  return (
    <div className="containerPagamento">
      <span className="title-pagamento">Pagamentos</span>

      <div className="form-group-pagamento filtro">
        <label htmlFor="filtro-status">Filtro</label>
        <select
          id="filtro-status"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        >
          <option value="todos">Todos</option>
          <option value="pago">Pagos</option>
          <option value="pendente">Pendentes</option>
        </select>
      </div>

      {loading ? (
        <div className="loading">Carregando...</div>
      ) : (
        <div className="listagemPagamento">
          <div className="header">
            <span>Data de Pagamento</span>
            <span>Valor</span>
            <span>CNPJ</span>
            <span>Descrição</span>
            <span>Data de Fechamento</span>
            <span>Status</span>
          </div>
          <div className="scroll">
            <div className="inside-container-pagamento">
              {pagamentosFiltrados.map((pagamento, index) => (
                <div key={index} className={`item ${pagamento.status}`}>
                  <span>{new Date(pagamento.datacadastro).toLocaleDateString("pt-BR")}</span>
                  <span>{pagamento.valor}</span>
                  <span>{pagamento.clientecnpj}</span>
                  <span>{pagamento.descricao}</span>
                  <span>{pagamento.datafechado ? new Date(pagamento.datafechado).toLocaleDateString("pt-BR") : "Não fechado"}</span>
                  <span className={`status ${pagamento.datafechado ? "pago" : "pendente"}`}>
                    {pagamento.datafechado ? "Pago" : "Pendente"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListagemPagamentos;
