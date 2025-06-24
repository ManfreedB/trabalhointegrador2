import React, { useState, useEffect, useCallback } from "react";
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import "./style.css";
import axios from "axios";
Modal.setAppElement("#root");

function ListagemFuncionarios() {
  const [filtro, setFiltro] = useState("todos");
  const [funcionarios, setFuncionarios] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null);
  const [nome, setNome] = useState("");
  const [conta, setConta] = useState("");
  const [cargo, setCargo] = useState("");
  const [senha, setSenha] = useState("");

  const fetchFuncionarios = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://integrador-backend.herokuapp.com/relatorio/funcionarios",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      setFuncionarios(response.data);
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
      alert("Erro ao carregar a lista de funcionários. Tente novamente.");
    }
  }, []);

  useEffect(() => {
    fetchFuncionarios();
  }, [fetchFuncionarios]);

  const getItensFiltrados = () => {
    if (filtro === "funcionario") {
      return funcionarios.filter((funcionario) => funcionario.cargo === "funcionario");
    } else if (filtro === "gerente") {
      return funcionarios.filter((funcionario) => funcionario.cargo === "gerente");
    }
    return funcionarios;
  };

  const deletarFuncionario = async (cpf) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://integrador-backend.herokuapp.com/excluir/funcionarios/${cpf}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setFuncionarios(funcionarios.filter(funcionario => funcionario.cpf !== cpf));
      toast.success("Funcionario excluido com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar funcionario: " + error);
      toast.error("Erro ao deletar o funcionario");
    }
  };

  const alteraFuncionario = (funcionario) => {
    setFuncionarioSelecionado(funcionario);
    setNome(funcionario.nome);
    setConta(funcionario.conta);
    setCargo(funcionario.cargo);
    setSenha("");
    setModalOpen(true);
  };

  const updateFuncionario = async (cpf) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`https://integrador-backend.herokuapp.com/update/funcionarios/${cpf}`, {
        cpf,
        nome,
        conta,
        senha,
        cargo
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Funcionário atualizado com sucesso!");
      setModalOpen(false);
      fetchFuncionarios();
    } catch (error) {
      console.error("Erro ao atualizar funcionario: " + error);
      toast.error("Erro ao atualizar funcionario.")
    }
  }

  return (
    <div class="max">
      <div className="containerListagemFuncionario">
        <div className="inside-containerListagemFuncionario">
          <div className="form-group-listagem-funcionario">
            <label htmlFor="filtro">Filtro</label>
            <select
              id="filtro"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="funcionario">Funcionários</option>
              <option value="gerente">Gerentes</option>
            </select>
          </div>

          <div className="listagemFuncionario">
            <div className="header">
              <span>
                <strong>Nome</strong>
              </span>
              <span>
                <strong>CPF</strong>
              </span>
              <span>
                <strong>Cargo</strong>
              </span>
              <span>
                <strong>Ações</strong>
              </span>
            </div>
            <div class="scroll">
              {getItensFiltrados().map((funcionario, index) => (
                <div key={index} className="item">
                  <span>{funcionario.nome}</span>
                  <span>{funcionario.cpf}</span>
                  <span>{funcionario.cargo}</span>
                  <button
                    className="actions"
                    onClick={() => deletarFuncionario(funcionario.cpf)}
                  >
                    Deletar
                  </button>
                  <button
                    className="actions"
                    onClick={() => alteraFuncionario(funcionario)}
                  >
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
        contentLabel="Alterar Funcionario"
        className="modal"
        overlayClassName="overlay">
        <h2>Alterar Funcionario</h2>
        <form>
          <div className="form-group">
            <label htmlFor="nome">
              Nome: <input id="nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="conta">
              Conta: <input id="conta" type="text" value={conta} onChange={(e) => setConta(e.target.value)} />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="cargo">
              Cargo: <select
                id="cargo"
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
              >
                <option value="funcionario">Funcionário</option>
                <option value="gerente">Gerente</option>
              </select>
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="senha">
              Senha: <input id="senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
            </label>
          </div>

          <button type="button" onClick={() => updateFuncionario(funcionarioSelecionado.cpf)}>
            Atualizar Funcionário
          </button>
        </form>
        <button className="close" onClick={() => setModalOpen(false)}>Fechar</button>
      </Modal>

    </div>
  );
}

export default ListagemFuncionarios;
