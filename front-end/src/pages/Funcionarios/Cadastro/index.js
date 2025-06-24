import React, { useState, useCallback } from "react";
import { toast } from 'react-toastify';
import axios from "axios";
import "./style.css";
import InputMask from "react-input-mask";

function CadastroFuncionarios() {
  const [isManager, toggleIsManager] = useState(false);

  const handleSubmit = useCallback(async () => {
    const cpf = document.getElementById("cpf").value;
    const nome = document.getElementById("nome").value;
    const senha = document.getElementById("senha").value;
    const conta = document.getElementById("conta").value;

    const token = localStorage.getItem("token");

    if (cpf && nome && senha && conta) {
      try {
        await axios.post(
          "https://integrador-backend.herokuapp.com/cadastro/funcionarios",
          {
            cpf,
            nome,
            senha,
            conta,
            cargo: isManager ? "gerente" : "funcionario",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(`Funcionário cadastrado com sucesso!`);
        document.getElementById("cpf").value = "";
        document.getElementById("nome").value = "";
        document.getElementById("senha").value = "";
        document.getElementById("conta").value = "";
        toggleIsManager(false);
      } catch (e) {
        toast("Erro ao cadastrar funcionário.");
        console.error("erro no cadastro de funcionario: " + e);
      }
    } else {
      toast.error("Por favor, preencha todos os campos.");
    }
  }, [isManager]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="container-services">
        <div className="tabs">
          <div
            className={"tab " + (!isManager ? "active" : "")}
            id="tab-funcionario"
            onClick={() => toggleIsManager(false)}
          >
            Funcionário
          </div>
          <div
            className={"tab " + (isManager ? "active" : "")}
            id="tab-gerente"
            onClick={() => toggleIsManager(true)}
          >
            Gerente
          </div>
        </div>

        <div id="form-funcionario" className="forms">
          <div className="form-group">
            <label htmlFor="cpf">CPF</label>
            <InputMask mask="999.999.999-99" id="cpf" placeholder="Digite o CPF" />
          </div>
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input type="text" id="nome" placeholder="Digite o nome" />
          </div>
          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input type="password" id="senha" placeholder="Digite a senha" />
          </div>
          <div className="form-group">
            <label htmlFor="conta">Conta</label>
            <input type="text" id="conta" placeholder="Digite a conta para o usuario(nome@empresa)" />
          </div>
          <button id="btn-cadastrar">Cadastrar Funcionário</button>
        </div>
      </div>
    </form>
  );
}

export default CadastroFuncionarios;
