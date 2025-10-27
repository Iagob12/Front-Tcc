import React, { useState, useEffect, useRef } from "react";
import "../../styles/Header/style.css";
import Logo from "../../assets/Logos/Logo.svg";
import Button from "../Button";
import { Link, useNavigate } from 'react-router-dom';
import { apiGet, apiPost } from '../../config/api';
import { User, X } from 'lucide-react';

const Header = () => {
  const [aberto, setAberto] = useState(false);
  const [logado, setLogado] = useState(false);
  const [carregando, setCarregando] = useState(true); // Estado de carregamento
  const [modalPerfilAberto, setModalPerfilAberto] = useState(false);
  const [userData, setUserData] = useState(null);
  const dialogRef = useRef(null);
  const navigate = useNavigate();

  console.log("🎨 Header renderizado - Estado logado:", logado, "Carregando:", carregando);

  // Checa se o usuário está logado
  useEffect(() => {
    const checkLogin = async () => {
      try {
        console.log("🔍 Verificando login...");
        const response = await apiGet('/auth/check');
        console.log("📡 Resposta do /auth/check:", response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log("✅ Usuário logado:", data);
          setLogado(true);
          setUserData(data); // Armazena dados do usuário
        } else {
          console.log("❌ Usuário não logado");
          setLogado(false);
          setUserData(null);
        }
      } catch (error) {
        console.error("❌ Erro ao verificar login:", error);
        setLogado(false);
        setUserData(null);
      } finally {
        setCarregando(false); // Finaliza o carregamento
      }
    };
    checkLogin();
    
    // Escuta evento customizado para atualizar o estado após login
    window.addEventListener('loginSuccess', checkLogin);
    
    return () => {
      window.removeEventListener('loginSuccess', checkLogin);
    };
  }, []);

  // Controla o modal de perfil
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (modalPerfilAberto) {
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    } else {
      dialog.close();
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modalPerfilAberto]);

  const handleLogout = async () => {
    try {
      const response = await apiPost('/auth/logout', {});
      
      if (response.ok) {
        console.log("✅ Logout realizado com sucesso");
        setLogado(false);
        setUserData(null);
        setModalPerfilAberto(false);
        navigate("/");
        window.location.reload();
      } else {
        console.error("❌ Erro no logout");
        alert('Erro ao fazer logout');
      }
    } catch (error) {
      console.error("❌ Erro no logout:", error);
      alert('Erro ao fazer logout');
    }
  };

  const handleEditarPerfil = () => {
    alert('Funcionalidade de editar perfil ainda não está disponível');
  };

  const handleAreaVoluntarios = () => {
    alert('Funcionalidade de área de voluntários ainda não está disponível');
  };

  return (
    <>
      <header>
        <Link to="/">
          <img src={Logo} alt="Logo dos Voluntarios Pro Bem, três bonequinhos, preto cinza e vermelho" className="logo" />
        </Link>

        <nav className="nav-header">
          <ul className="lista-header">
            <li><Link to="/eventos">Eventos</Link></li>

            <li
              className="menu-item-com-dropdown"
              onMouseEnter={() => setAberto(true)}
              onMouseLeave={() => setAberto(false)}
            >
              <Link to="/sobre">Sobre Nós ▾</Link>

              <div className={`sobre-dropdown ${aberto ? "ativo" : "inativo"}`}>
                <ul className="lista-dropdown">
                  <li><Link to="/sobre#nossa_historia" className="drop-item" onClick={() => setAberto(false)}>Nossa História</Link></li>
                  <li><Link to="/sobre#linha-do-tempo" className="drop-item" onClick={() => setAberto(false)}>Linha do Tempo</Link></li>
                  <li><Link to="/sobre#equipe" className="drop-item" onClick={() => setAberto(false)}>Equipe</Link></li>
                  <li><Link to="/sobre#projetos" className="drop-item" onClick={() => setAberto(false)}>Projetos</Link></li>
                </ul>
              </div>
            </li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/como-ajudar">Como Ajudar</Link></li>
          </ul>
        </nav>

        <div className="header-buttons">
          <Link to="/como-ajudar">
            <Button text="Doe Agora" primary={true} />
          </Link>

          <div style={{ minWidth: '150px' }}>
            {carregando ? (
              <div style={{ width: '150px', height: '40px' }}></div>
            ) : logado ? (
              <button 
                className="profile-icon-btn" 
                onClick={() => setModalPerfilAberto(true)}
                aria-label="Abrir perfil"
              >
                <User size={24} strokeWidth={2} />
              </button>
            ) : (
              <Link to="/cadastrar-se">
                <Button text="Cadastrar-se →" primary={false} />
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Modal de Perfil */}
      <dialog
        ref={dialogRef}
        className="modal-dialog-perfil"
        onClick={(e) => {
          if (e.target === dialogRef.current) {
            setModalPerfilAberto(false);
          }
        }}
      >
        <div className="modal-wrapper-perfil">
          <div className="modal-card-perfil">
            {/* Header */}
            <div className="modal-header-perfil">
              <h2 className="modal-title-perfil">PERFIL</h2>
              <button 
                onClick={() => setModalPerfilAberto(false)} 
                className="modal-close-btn-perfil"
                aria-label="Fechar modal"
              >
                <X size={24} />
              </button>
            </div>

            {/* Body */}
            <div className="modal-body-perfil">
              {/* Informações do Usuário */}
              <div className="user-info-section">
                <div className="user-avatar">
                  <User size={40} strokeWidth={2} />
                </div>
                <div className="user-details">
                  <h3 className="user-name">{userData?.nome || 'Usuário'}</h3>
                  <p className="user-email">{userData?.email || 'voluntario@gmail.com'}</p>
                </div>
              </div>

              {/* Badge de Tipo de Usuário */}
              <div className="user-badge">
                <div className="badge-dot"></div>
                <span className="badge-text">{userData?.tipo || 'Voluntário'}</span>
              </div>

              {/* Divisor */}
              <div className="divider-perfil"></div>

              {/* Seção de Acesso */}
              <div className="access-section">
                <h4 className="section-title-perfil">ACESSO</h4>
                <button className="menu-item-perfil" onClick={handleEditarPerfil}>
                  Editar perfil
                </button>
                <button className="menu-item-perfil" onClick={handleAreaVoluntarios}>
                  Área de voluntários
                </button>
              </div>

              {/* Divisor */}
              <div className="divider-perfil"></div>

              {/* Botão de Logout */}
              <button className="logout-btn-perfil" onClick={handleLogout}>
                Fazer logout
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Header;
