import React, { useState, useEffect, useRef } from "react";
import "../../styles/Header/style.css";
import Logo from "../../assets/Logos/Logo.svg";
import Button from "../Button";
import { Link, useNavigate } from 'react-router-dom';
import { apiGet, apiPost } from '../../config/api';
import { User, X } from 'lucide-react';

const Header = () => {
  const [aberto, setAberto] = useState(false);
  
  // Inicializa o estado de login com cache do localStorage para evitar "piscar"
  const [logado, setLogado] = useState(() => {
    const cached = localStorage.getItem('userLoggedIn');
    return cached === 'true';
  });
  
  const [carregando, setCarregando] = useState(false); // Não mostra loading inicial
  const [perfilAberto, setPerfilAberto] = useState(false);
  
  // Inicializa userData com cache do localStorage
  const [userData, setUserData] = useState(() => {
    const cached = localStorage.getItem('userData');
    return cached ? JSON.parse(cached) : null;
  });
  
  const perfilRef = useRef(null);
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
          setUserData(data);
          
          // Salva no localStorage para cache
          localStorage.setItem('userLoggedIn', 'true');
          localStorage.setItem('userData', JSON.stringify(data));
        } else {
          console.log("❌ Usuário não logado");
          setLogado(false);
          setUserData(null);
          
          // Limpa o cache
          localStorage.removeItem('userLoggedIn');
          localStorage.removeItem('userData');
        }
      } catch (error) {
        console.error("❌ Erro ao verificar login:", error);
        setLogado(false);
        setUserData(null);
        
        // Limpa o cache em caso de erro
        localStorage.removeItem('userLoggedIn');
        localStorage.removeItem('userData');
      } finally {
        setCarregando(false);
      }
    };
    
    // Executa a verificação em background
    checkLogin();
    
    // Escuta evento customizado para atualizar o estado após login
    window.addEventListener('loginSuccess', checkLogin);
    
    return () => {
      window.removeEventListener('loginSuccess', checkLogin);
    };
  }, []);

  // Fecha o dropdown de perfil ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (perfilRef.current && !perfilRef.current.contains(event.target)) {
        setPerfilAberto(false);
      }
    };

    if (perfilAberto) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [perfilAberto]);

  const handleLogout = async () => {
    try {
      const response = await apiPost('/auth/logout', {});
      
      if (response.ok) {
        console.log("✅ Logout realizado com sucesso");
        setLogado(false);
        setUserData(null);
        setPerfilAberto(false);
        
        // Limpa o cache do localStorage
        localStorage.removeItem('userLoggedIn');
        localStorage.removeItem('userData');
        
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

          <div style={{ minWidth: '150px', position: 'relative' }} ref={perfilRef}>
            {logado ? (
              <>
                <button 
                  className="profile-icon-btn" 
                  onClick={() => setPerfilAberto(!perfilAberto)}
                  aria-label="Abrir perfil"
                >
                  <User size={24} strokeWidth={2} />
                </button>

                {/* Dropdown de Perfil */}
                <div className={`perfil-dropdown ${perfilAberto ? 'ativo' : 'inativo'}`}>
                  {/* Informações do Usuário */}
                  <div className="perfil-user-info">
                    <div className="perfil-avatar">
                      <User size={32} strokeWidth={2} />
                    </div>
                    <div className="perfil-details">
                      <h3 className="perfil-name">{userData?.nome || 'Usuário'}</h3>
                      <p className="perfil-email">{userData?.email || 'voluntario@gmail.com'}</p>
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="perfil-badge">
                    <div className="perfil-badge-dot"></div>
                    <span className="perfil-badge-text">{userData?.tipo || 'Voluntário'}</span>
                  </div>

                  {/* Divisor */}
                  <div className="perfil-divider"></div>

                  {/* Seção de Acesso */}
                  <div className="perfil-section">
                    <h4 className="perfil-section-title">ACESSO</h4>
                    <button className="perfil-menu-item" onClick={handleEditarPerfil}>
                      Editar perfil
                    </button>
                    <button className="perfil-menu-item" onClick={handleAreaVoluntarios}>
                      Área de voluntários
                    </button>
                  </div>

                  {/* Divisor */}
                  <div className="perfil-divider"></div>

                  {/* Logout */}
                  <button className="perfil-logout" onClick={handleLogout}>
                    Fazer logout
                  </button>
                </div>
              </>
            ) : (
              <Link to="/cadastrar-se">
                <Button text="Cadastrar-se →" primary={false} />
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
