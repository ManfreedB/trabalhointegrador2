import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import Modal from 'react-modal';
import "./Sidebar.css";

function Sidebar() {
  const [showCadastros, setShowCadastros] = useState(false);
  const [showRelatorios, setShowRelatorios] = useState(false);
  const [showEmissoes, setShowEmissoes] = useState(false);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const openModal = async () => {
    try {
      let response;
      const token = localStorage.getItem("token");
      if (user.cargo === "empresa") {
        response = await axios.get(`https://integrador-backend.herokuapp.com/empresa/dados/${user.conta}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } else {
        response = await axios.get(`https://integrador-backend.herokuapp.com/funcionarios/dados/${user.conta}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      setUserData(response.data);
      setModalOpen(true);

    } catch (error) {
      console.error("Erro ao buscar dados do usuario: " + error);
      toast.error("Erro ao buscar dados do usuario!");
    }
  }

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleToggleCadastros = () => {
    setShowCadastros(!showCadastros);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleToggleRelatorios = () => {
    setShowRelatorios(!showRelatorios);
  };

  const handleToggleEmissoes = () => {
    setShowEmissoes(!showEmissoes);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const goToHome = () => {
    navigate("/home");
  }

  return (
    <div className="sidebar">
      <div>
        <div className="sidebar-header">
          <span className="user-icon">
            <FaUser
              className="data-icon"
              onClick={openModal}
              style={{ cursor: "pointer", marginLeft: "8px" }}
              title="Dados do Usuario"
            />
            <FaHome
              className="home-icon"
              onClick={goToHome}
              style={{ cursor: "pointer", marginLeft: "8px" }}
              title="Ir para a Home"
            />
          </span>
          <span className="user-info">
            {user ? user.conta : "Carregando..."}
          </span>
        </div>
        <div className="sidebar-menu">
          <div className="menu-item" onClick={handleToggleCadastros}>
            <span>Cadastros</span>
            <span className="arrow-icon">▼</span>
          </div>
          <ul className={`submenu ${showCadastros ? "show" : ""}`}>
            {user && user.cargo !== "funcionario" && (
              <>
                <li>
                  <Link to="/Home/CadastroFuncionarios">Funcionarios</Link>
                </li>
                <li>
                  <Link to="/Home/CadastroClientes">Clientes</Link>
                </li>
                <li>
                  <Link to="/Home/CadastroTipoServico">Tipos de Serviço</Link>
                </li>
              </>
            )}
            <li>
              <Link to="/Home/CadastroServico">Serviços</Link>
            </li>
          </ul>
          <div className="menu-item" onClick={handleToggleRelatorios}>
            <span>Relatórios</span>
            <span className="arrow-icon">▼</span>
          </div>
          <ul className={`submenu ${showRelatorios ? "show" : ""}`}>
            {user && user.cargo !== "funcionario" && (
              <>
                <li>
                  <Link to="/Home/ListagemFuncionarios">Funcionarios</Link>
                </li>
              </>
            )}
            <li>
              <Link to="/Home/ListagemClientes">Clientes</Link>
            </li>
            <li>
              <Link to="/Home/ListagemTipoServico">Tipos de Serviço</Link>
            </li>
            <li>
              <Link to="/Home/ListagemServico">Serviços</Link>
            </li>
            <li>
              <Link to="/home/ListagemPagamento">Pagamentos</Link>
            </li>
          </ul>
          <div className="menu-item" onClick={handleToggleEmissoes}>
            <span>Emissões</span>
            <span className="arrow-icon">▼</span>
          </div>
          <ul className={`submenu ${showEmissoes ? "show" : ""}`}>
            <li>
              <Link to="/home/ListagemEmissoesBoleto">Boleto</Link>
            </li>
            <li>
              <Link to="/home/ListagemEmissoesNotaF">Nota Fiscal de Serviço</Link>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <button onClick={handleLogout}>Sair</button>
      </div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel="Dados do Usuário"
        ariaHideApp={false}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2>Dados do Usuário</h2>
        {userData ? (
          <div>
            <p><strong>Conta:</strong> {userData.conta}</p>
            <p><strong>Cargo:</strong> {userData.cargo}</p>

            {userData.cargo === "empresa" ? (
              <>
                <p><strong>CNPJ:</strong> {userData.cnpj}</p>
                <p><strong>Nome da Empresa:</strong> {userData.nomeempresa}</p>
              </>
            ) : (
              <>
                <p><strong>CPF:</strong> {userData.cpf}</p>
                <p><strong>Nome:</strong> {userData.nome}</p>
              </>
            )}
          </div>
        ) : (
          <p>Carregando...</p>
        )}

        <button onClick={closeModal}>Fechar</button>
      </Modal>
    </div>
  );
}

export default Sidebar;
