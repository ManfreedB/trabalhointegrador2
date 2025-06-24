import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "./style.css"

function ListagemEmissoesNotaF() {
  const [emissoes, setEmissoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroData, setFiltroData] = useState("todos");

  const fetchEmissoes = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://integrador-backend.herokuapp.com/relatorio/pagamentosAbertos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);

      setEmissoes(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar emissões:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmissoes();
  }, []);

  const gerarNotaFiscal = (index) => {
    const emissao = emissoes[index];
    const doc = new jsPDF();
    const margemEsquerda = 20;
    const margemSuperior = 20;
    const larguraPagina = 210;
    const alturaPagina = 297;

    doc.setFontSize(16);
    doc.setFont("times", "bold");
    doc.text('NOTA FISCAL', larguraPagina / 2, margemSuperior, null, null, 'center');
    doc.setFontSize(12);
    doc.setFont("times", "normal");

    doc.text(`Emitente: ${emissao.nomeempresa}`, margemEsquerda, margemSuperior + 30);
    doc.text(`CNPJ: ${emissao.cnpj}`, margemEsquerda, margemSuperior + 40);

    doc.text(`Destinatario: ${emissao.clientecnpj}`, margemEsquerda, margemSuperior + 70);
    doc.text(`Cliente: ${emissao.clientecnpj}`, margemEsquerda, margemSuperior + 80);
    doc.text(`Endereco - Rua: ${emissao.rua}, Cidade: ${emissao.cidade}, Estado: ${emissao.estado}`, margemEsquerda, margemSuperior + 90);

    doc.text(`Data de Emissao: ${new Date(emissao.datacadastro).toLocaleDateString()}`, larguraPagina - 80, margemSuperior + 30);
    doc.text(`Descricao do Servico: ${emissao.descricao}`, margemEsquerda, margemSuperior + 120);
    doc.text(`Valor Total: R$ ${emissao.valor}`, larguraPagina - 80, margemSuperior + 40);

    doc.text(`Produto/Servico: ${emissao.descricao}`, margemEsquerda, margemSuperior + 140);
    doc.text(`Quantidade: 1`, margemEsquerda, margemSuperior + 150);
    doc.text(`Valor Unitario: R$ ${emissao.valor}`, margemEsquerda, margemSuperior + 160);

    doc.text(`Total: R$ ${emissao.valor}`, larguraPagina - 80, margemSuperior + 180);

    doc.setFontSize(8);
    doc.text("Emitido por Sistema de Notas Fiscais", margemEsquerda, alturaPagina - 20);
    doc.save(`nota_fiscal_${emissao.clientecnpj}.pdf`);

    fecharPagamento(emissao.id);
  };

  const fecharPagamento = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token não encontrado.");
        alert("Você precisa estar logado para realizar essa ação.");
        return;
      }

      await axios.put(
        `https://integrador-backend.herokuapp.com/update/pagamentos/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchEmissoes();
    } catch (error) {
      console.error("Erro ao atualizar pagamento:", error);
      alert("Erro ao atualizar pagamento. Tente novamente.");
    }
  };

  const emissoesFiltradas =
    filtroData === "todos"
      ? emissoes
      : filtroData === "maisAntigo"
        ? [...emissoes].sort((a, b) => new Date(a.datacadastro) - new Date(b.datacadastro))
        : [...emissoes].sort((a, b) => new Date(b.datacadastro) - new Date(a.datacadastro));

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <div className="containerListagemEmissoesNotaF">
        <span className="title-emissoes-notaf">Notas Fiscais</span>

        <div className="form-group-listagem-notaf filtro">
          <label htmlFor="filtro-data">Filtro</label>
          <select
            id="filtro-data"
            value={filtroData}
            onChange={(e) => setFiltroData(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="maisAntigo">Mais Antigo</option>
            <option value="maisRecente">Mais Recente</option>
          </select>
        </div>

        <div className="inside-container-listagem-emissoes-notaf">
          <div className="listagemEmissoesNotaF">
            <div className="header">
              <span><strong>Data Cadastro</strong></span>
              <span><strong>Valor</strong></span>
              <span><strong>Descrição do Serviço</strong></span>
              <span><strong>CNPJ do Cliente</strong></span>
              <span><strong>Situação</strong></span>
              <span><strong>Ações</strong></span>
            </div>
            <div className="scroll">
              {emissoesFiltradas.map((emissao, index) => (
                <div key={index} className="item">
                  <span>{new Date(emissao.datacadastro).toLocaleDateString()}</span>
                  <span>{emissao.valor}</span>
                  <span>{emissao.descricao}</span>
                  <span>{emissao.clientecnpj}</span>
                  <span>Pagamento em aberto</span>
                  <button className="actions" onClick={() => gerarNotaFiscal(index)}>
                    Gerar Nota Fiscal
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListagemEmissoesNotaF;
