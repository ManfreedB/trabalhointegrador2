import React, { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import Modal from 'react-modal';
import axios from "axios";
import "./style.css";

function ListagemServicos() {
  const [data, setData] = useState([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [itemSelecionado, setItemSelecionado] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  console.log(data);

  const fetchTiposServicos = useCallback(() => {
    const token = localStorage.getItem("token");
    try {
      axios
        .get("https://integrador-backend.herokuapp.com/listagem/tipoServico", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setData(response.data);
        });
    } catch (e) {
      alert(e);
    }
  }, []);

  useEffect(() => {
    fetchTiposServicos();
  }, [fetchTiposServicos], []);

  const alterarServico = (item) => {
    setItemSelecionado(item);
    setNome(item.nome);
    setDescricao(item.descricao);
    setModalOpen(true);
  }

  const updateServico = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`https://integrador-backend.herokuapp.com/update/tipoServico/${id}`, {
        nome,
        descricao
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success("Tipo de serviço atualizado com sucesso!");
      setModalOpen(false);
      fetchTiposServicos();
    } catch (error) {
      console.error("Erro ao atualizar tipos de serviço: " + error);
      toast.error("Erro ao atualizar tipos de serviço.");
    }
  };

  return (
    <div class="maxListagem">
      <div className="containerListagem">
        <div class="inside-container-listagem">
          <div className="listagemListagem">
            <div className="header">
              <span>
                <strong>Nome</strong>
              </span>
              <span>
                <strong>Descrição</strong>
              </span>
              <span>
                <strong>Ações</strong>
              </span>
            </div>
            {data.map((servico, index) => (
              <div key={index} className="itemListagem">
                <span>{servico.nome}</span>
                <span>{servico.descricao}</span>
                <button
                  className="actions"
                  onClick={() => alterarServico(servico)}
                >
                  Alterar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>


      <Modal isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Alterar Funcionario"
        className="modal"
        overlayClassName="overlay">
        <h2>Alterar Tipo de Funcionario</h2>
        <form>
          <div className="form-group">
            <label htmlFor="nome">
              Nome: <input id="nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="descrição">
              Descrição: <textarea id="descrição" type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
            </label>
          </div>
          <button type="button" onClick={() => updateServico(itemSelecionado.id)}>
            Atualizar Tipo de Serviço
          </button>
        </form>
        <button className="close" onClick={() => setModalOpen(false)}>Fechar</button>
      </Modal>
    </div>
  );
}

export default ListagemServicos;
