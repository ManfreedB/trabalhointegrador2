import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "./style.css";

function ListagemEmissoesBoleto() {
  const [emissoes, setEmissoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroData, setFiltroData] = useState("todos");

  const fetchEmissoes = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://integrador-backend.herokuapp.com/relatorio/pagamentosAbertos",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

  const gerarDocumentos = async (index) => {
    const emissao = emissoes[index];
    console.log(emissao);

    const doc = new jsPDF();
    const margemEsquerda = 20;
    const margemSuperior = 20;
    const larguraPagina = 210;
    const alturaPagina = 297;


    doc.setFontSize(16);
    doc.setFont("times", "bold");
    doc.text('BOLETO BANCARIO', larguraPagina / 2, margemSuperior, null, null, 'center');
    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`Cedente: ${emissao.nomeempresa}`, margemEsquerda, margemSuperior + 30);
    doc.text(`CNPJ: ${emissao.cnpj}`, margemEsquerda, margemSuperior + 40);
    doc.text(`Sacado: ${emissao.clientecnpj}`, margemEsquerda, margemSuperior + 60);
    doc.text(`Cliente: ${emissao.clientecnpj}`, margemEsquerda, margemSuperior + 70);
    doc.text(`Valor: R$ ${emissao.valor}`, larguraPagina - 80, margemSuperior + 30);
    doc.text(`Data de Vencimento: ${new Date().toLocaleDateString()}`, larguraPagina - 80, margemSuperior + 40);
    doc.text(`Data de Emissao: ${new Date(emissao.datacadastro).toLocaleDateString()}`, larguraPagina - 80, margemSuperior + 50);
    doc.text(`Descricao: ${emissao.descricao}`, margemEsquerda, margemSuperior + 80);
    doc.setLineWidth(1);
    doc.line(margemEsquerda, margemSuperior + 100, larguraPagina - 20, margemSuperior + 100);
    doc.text('Codigo de Barras: 1234567890123456789012345678901234567890', margemEsquerda, margemSuperior + 110);
    doc.setFontSize(10);
    doc.text("Instrucoes de pagamento:", margemEsquerda, margemSuperior + 120);
    doc.text("1. O pagamento deve ser realizado ate a data de vencimento.", margemEsquerda, margemSuperior + 130);
    doc.text("2. Apos o vencimento, acresce-se juros de 1% ao mes.", margemEsquerda, margemSuperior + 140);
    doc.text("3. Em caso de duvidas, entre em contato com o cedente.", margemEsquerda, margemSuperior + 150);
    doc.setFontSize(10);
    doc.text("Banco: Teste", margemEsquerda, margemSuperior + 160);
    doc.text("Agencia: XXXX", margemEsquerda, margemSuperior + 170);
    doc.text("Conta Corrente: 12345678-9", margemEsquerda, margemSuperior + 180);
    doc.text("Autenticacao Mecanica", margemEsquerda, margemSuperior + 190);
    doc.setFontSize(8);
    doc.text("Emitido por Sistema de Boletos Online", margemEsquerda, alturaPagina - 20);
    doc.save(`boleto_${emissao.clientecnpj}.pdf`);

    await fecharPagamento(emissao.id);
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
      <div className="containerListagemEmissoesBoleto">
        <span className="title-emissoes-boleto">Boletos</span>


        <div className="form-group-listagem-boleto filtro">
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

        <div className="inside-container-listagem-emissoes-boleto">
          <div className="listagemEmissoesBoleto">
            <div className="header">
              <span>
                <strong>Data Cadastro</strong>
              </span>
              <span>
                <strong>Valor</strong>
              </span>
              <span>
                <strong>Descrição do Serviço</strong>
              </span>
              <span>
                <strong>CNPJ do Cliente</strong>
              </span>
              <span>
                <strong>Situação</strong>
              </span>
              <span>
                <strong>Ações</strong>
              </span>
            </div>
            <div className="scroll">
              {emissoesFiltradas.map((emissao, index) => (
                <div key={index} className="item">
                  <span>{new Date(emissao.datacadastro).toLocaleDateString()}</span>
                  <span>{emissao.valor}</span>
                  <span>{emissao.descricao}</span>
                  <span>{emissao.clientecnpj}</span>
                  <span>Pagamento em aberto</span>
                  <button className="actions" onClick={() => gerarDocumentos(index)}>
                    Gerar Documentos
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

export default ListagemEmissoesBoleto;
