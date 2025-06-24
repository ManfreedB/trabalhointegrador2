import React, { useState, useCallback, useRef } from "react";
import { toast } from "react-toastify";
import "./style.css";
import axios from "axios";
import InputMask from "react-input-mask";

function CadastroClientes() {
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [rua, setEndereco] = useState("");
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [telefone, setTelefone] = useState("");
  const timeoutRef = useRef(null);


  const buscarEndereco = async (cep) => {
    if (cep.length === 9) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`);
        if (response.data.erro) {
          toast.error("CEP não encontrado!");
        } else {
          setEndereco(response.data.logradouro);
          setCidade(response.data.localidade);
          setEstado(response.data.uf);
        }
      } catch (error) {
        toast.error("Erro ao buscar CEP");
      }
    }
  };

  const handleCepChange = (e) => {
    const newCep = e.target.value;
    setCep(newCep);


    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }


    timeoutRef.current = setTimeout(() => {
      buscarEndereco(newCep);
    }, 2000);
  };

  const cadastrarCliente = useCallback(async () => {
    if (!nome || !cnpj || !rua || !cep || !cidade || !estado || !telefone) {
      toast.error("Favor preencha todos os campos!");
      return;
    }

    try {

      const token = localStorage.getItem("token");


      await axios.post(
        "https://integrador-backend.herokuapp.com/cadastro/clientes",
        {
          cnpj,
          nome,
          rua,
          cep,
          cidade,
          estado,
          telefone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNome("");
      setCnpj("");
      setEndereco("");
      setCep("");
      setCidade("");
      setEstado("");
      setTelefone("");
      toast.success("Cliente cadastrado com sucesso!");
    } catch (error) {
      toast.error("Erro no cadastro de cliente!");
      console.error("erro cadastro cliente: " + error);
    }
  }, [cep, cidade, cnpj, estado, nome, rua, telefone]);

  return (
    <div>
      <div className="container-services">
        <div id="form-cliente" className="forms">
          <div className="form-group">
            <label htmlFor="nome">Nome do Cliente</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite o nome do cliente"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cnpj">CNPJ</label>
            <InputMask
              mask="99.999.999/9999-99"
              id="cnpj"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              placeholder="Digite o CNPJ do cliente"
            />
          </div>
          <div className="form-group">
            <label htmlFor="endereco">Endereço</label>
            <input
              type="text"
              id="endereco"
              value={rua}
              onChange={(e) => setEndereco(e.target.value)}
              placeholder="Digite o endereço do cliente"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cep">CEP</label>
            <InputMask
              mask="99999-999"
              id="cep"
              value={cep}
              onChange={handleCepChange}
              placeholder="Digite o CEP do cliente, CEP preenche automáticamente cidade e estado"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cidade">Cidade</label>
            <input
              type="text"
              id="cidade"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              placeholder="Digite a cidade do cliente"
            />
          </div>
          <div className="form-group">
            <label htmlFor="estado">Estado</label>
            <input
              type="text"
              id="estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              maxLength="2"
              pattern="[A-Za-z]{2}"
              title="0"
              placeholder="Digite a sigla do estado do cliente"
            />
          </div>
          <div className="form-group">
            <label htmlFor="telefone">Telefone</label>
            <InputMask
              mask="(99) 9999-9999"
              id="telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="Digite o telefone do cliente"
            />
          </div>
          <button onClick={cadastrarCliente}>Cadastrar</button>
        </div>
      </div>
    </div>
  );
}

export default CadastroClientes;
