import React from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from "./pages/Home";
import Eventos from "./pages/Eventos";
import Cadastro from "./pages/Cadastro";
import ComoAjudar from "./pages/ComoAjudar";
import Login from "./pages/Login";
import Tarefas from './pages/Tarefas';
import TornarVoluntario from "./pages/TornarVoluntario";
import SobreNos from "./pages/SobreNos";
import Blog from "./pages/Blog";
import AdicionarNoticia from "./pages/AdicionarNoticia";
import AdicionarEvento from "./pages/AdicionarEvento";
import AdicionarAtividade from "./pages/AdicionarAtividade";
import OAuth2Callback from "./pages/OAuth2Callback";
import PageSistemaAprovacao from "./pages/SistemaAprovacao";
import PageRelatorios from "./pages/PageRelatorios"

// Componente para scroll to top ao navegar
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
}

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/oauth2/callback" element={<OAuth2Callback />} />

        <Route path="/eventos" element={<Eventos />} />
        <Route path="/cadastrar-se" element={<Cadastro />} />
        <Route path="/como-ajudar" element={<ComoAjudar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sobre" element={<SobreNos />} />
        <Route path="/tarefas" element={<Tarefas />} />
        <Route path="/voluntario" element={<TornarVoluntario />} />
        <Route path="/quero-ser-voluntario" element={<TornarVoluntario />} />
        <Route path="/blog" element={<Blog />} />

        <Route path="/adicionar-noticia" element={ <AdicionarNoticia /> } />
        <Route path="/adicionar-evento" element={ <AdicionarEvento /> } />
        <Route path="/adicionar-atividade" element={ <AdicionarAtividade /> } />
        
        <Route path="/sistema-aprovacao" element={<PageSistemaAprovacao/>} />
        
        <Route path="/gerenciar-relatorios" element={<PageRelatorios/>} />
      </Routes>
    </>
  );
};

export default App;