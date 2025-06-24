import React, { useCallback } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./style.css";

function Pagamento() {
  const handleSubmit = useCallback(() => {
    document
      .getElementById("btn-cadastrar-servico")
      .addEventListener("click", async () => {
        const descricao = document.getElementById("descricao").value;
        const nome = document.getElementById("nome").value;
        const token = localStorage.getItem("token");

        if (descricao && nome) {
          try {
            await axios.post(
              "https://integrador-backend.herokuapp.com/cadastro/tipoServico",
              {
                nome,
                descricao,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            toast(
              `Tipo de serviço cadastrado com sucesso!
              Descrição: ${descricao}
              Nome: ${nome}
              `
            );
            document.getElementById("descricao").value = "";
            document.getElementById("nome").value = "";
          } catch (e) {
            toast.error("erro ao cadastrar tipo de serviço!");
            console.error("erro cadastro tipo: " + e);
          }
        } else {
          toast("Por favor, preencha todos os campos.");
        }
      });
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="container-services">
        <div id="form-servico" className="forms">
          <div className="form-group">
            <label htmlFor="descricao">Tipo do serviço</label>
            <input
              id="nome"
              placeholder="Insira o nome do tipo de serviço..."
            />
          </div>
          <div className="form-group">
            <label htmlFor="descricao">Descrição do tipo de serviço</label>
            <textarea
              id="descricao"
              placeholder="Descreva o tipo de serviço..."
            ></textarea>
          </div>
          <button id="btn-cadastrar-servico">Cadastrar</button>
        </div>
      </div>
    </form>
  );
}

export default Pagamento;
