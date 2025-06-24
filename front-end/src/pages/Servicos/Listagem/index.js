import React, { useState, useEffect, useCallback } from "react";
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import axios from "axios";
import "./style.css";

function ListagemServicos() {
  const [filtro, setFiltro] = useState("todos");
  const [tiposOptions, setTiposOptions] = useState([]);
  const [clientesOptions, setClienteOptions] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(null);
  const [tipoServico, setTipoServico] = useState("");
  const [itemSelecionado, setItemSelecionado] = useState("");
  const [cliente, setCliente] = useState("");

  const fetchOptions = useCallback(async () => {
    const token = localStorage.getItem("token");

    try {
      const tipos = await axios.get(
        "https://integrador-backend.herokuapp.com/listagem/tipoServico",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTiposOptions(
        tipos?.data?.map((c) => ({
          label: c.nome,
          value: c.id,
        }))
      );

      const clientes = await axios.get(
        "https://integrador-backend.herokuapp.com/relatorio/clientes",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setClienteOptions(
        clientes?.data?.map((c) => ({ label: c.nomeempresa, value: c.cnpj }))
      );
    } catch (e) {
      console.error("Erro ao buscar opções:", e);
    }
  }, []);


  const fetchServicos = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://integrador-backend.herokuapp.com/listagem/servico",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setServicos(response.data);

      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServicos();
  }, []);

  const getItensOrdenados = () => {
    const servicosOrdenados = [...servicos];
    if (filtro === "tipo") {
      return servicosOrdenados.sort((a, b) => a.tipo_nome.localeCompare(b.tipo_nome));
    } else if (filtro === "cliente") {
      return servicosOrdenados.sort((a, b) => a.clientecnpj.localeCompare(b.clientecnpj));
    } else if (filtro === "data") {
      return servicosOrdenados.sort((a, b) => new Date(a.datarealizacao) - new Date(b.datarealizacao));
    }
    return servicosOrdenados;
  };

  const alterarServico = (item) => {
    console.log(item);
    fetchOptions();
    setModalOpen(true);
    setItemSelecionado(item);
    setCliente(item.clientecnpj);
    setTipoServico(item.tipo_id);
  }

  const handleTipoServicoChange = (e) => {
    const tipoIdSelecionado = e.target.value;
    setTipoServico(tipoIdSelecionado);
  };

  const updateServico = async () => {

    try {
      const id = itemSelecionado.id;
      const token = localStorage.getItem("token");
      await axios.put(`https://integrador-backend.herokuapp.com/update/servico/${id}`, {
        clientecnpj: cliente,
        tipo_id: tipoServico
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      toast.success("Serviço atualizado com sucesso!");
      setModalOpen(false);
      fetchServicos();
    } catch (error) {
      console.error("Erro ao atualizar serviço: " + error);
      toast.error("Erro ao atualizar serviço.");
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div class="maxService">
      <div className="containerService">
        <div className="inside-container-service">
          <div className="form-group-service">
            <label htmlFor="filtro">Filtro</label>
            <select
              id="filtro"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="tipo">Tipo de Serviço</option>
              <option value="cliente">Cliente</option>
              <option value="data">Data Realização</option>
            </select>
          </div>

          <div className="listagemService">
            <div className="header">
              <span>
                <strong>Tipo de Serviço</strong>
              </span>
              <span>
                <strong>Cliente</strong>
              </span>
              <span>
                <strong>Data de Realização</strong>
              </span>
              <span>
                <strong>Ações</strong>
              </span>
            </div>
            <div class="scroll">
              {getItensOrdenados().map((servico, index) => (
                <div key={index} className="item">
                  <span>{servico.tipo_nome}</span>
                  <span>{servico.clientecnpj}</span>
                  <span>{servico.datarealizacao}</span>
                  <button class="actions" onClick={() => alterarServico(servico)}>
                    Alterar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Alterar Serviço"
        className="modal"
        overlayClassName="overlay">
        <h2>Alterar Serviço</h2>
        <form>
          <div className="form-group">
            <label htmlFor="tipo-servico">Tipo de serviço</label>
            <select
              id="tipo-servico"
              value={tipoServico}
              onChange={handleTipoServicoChange}
            >
              {tiposOptions?.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="cliente">Cliente</label>
            <select
              id="cliente"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
            >
              {clientesOptions?.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <button type="button" onClick={() =>
            updateServico()
          }>
            Atualizar Serviço
          </button>
        </form>
        <button className="close" onClick={() => setModalOpen(false)}>Fechar</button>
      </Modal>
    </div >
  );
}

export default ListagemServicos;
