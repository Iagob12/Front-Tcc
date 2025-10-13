import React, { useState, useEffect } from "react";
import "../../styles/Header/style.css";
import Logo from "../../assets/Logos/Logo.svg";
import Button from "../Button";
import { Link, useNavigate } from 'react-router-dom';
import { apiGet, apiPost } from '../../config/api';

const Header = () => {
  const [aberto, setAberto] = useState(false);
  const [logado, setLogado] = useState(false);
  const [carregando, setCarregando] = useState(true); // Estado de carregamento
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
        } else {
          console.log("❌ Usuário não logado");
          setLogado(false);
        }
      } catch (error) {
        console.error("❌ Erro ao verificar login:", error);
        setLogado(false);
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

  const handleLogout = async () => {
    try {
      const response = await apiPost('/auth/logout', {});
      
      if (response.ok) {
        console.log("✅ Logout realizado com sucesso");
        setLogado(false);
        navigate("/");
      } else {
        console.error("❌ Erro no logout");
      }
    } catch (error) {
      console.error("❌ Erro no logout:", error);
    }
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
              <Button text="Sair →" primary={false} onClick={handleLogout} />
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
