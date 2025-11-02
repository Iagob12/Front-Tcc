import React from "react";
import { Routes, Route } from 'react-router-dom';
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
import ProtectedRoute from "./components/ProtectedRoute";
import PageSistemaAprovacao from "./pages/SistemaAprovacao";

const App = () => {
  return (
    <>
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

        { /*Rotas de acesso e permissões */}
        <Route path="/adicionar-noticia" element={
          <ProtectedRoute requireAdmin={true}>
            <AdicionarNoticia />
          </ProtectedRoute>
        } />
        <Route path="/adicionar-evento" element={
          <ProtectedRoute requireAdmin={true}>
            <AdicionarEvento />
          </ProtectedRoute>
        } />
        <Route path="/adicionar-atividade" element={
          <ProtectedRoute requireAdmin={true}>
            <AdicionarAtividade />
          </ProtectedRoute>
        } />
        <Route path="/sistema-aprovacao" element={<PageSistemaAprovacao/>} />
      </Routes>
    </>
  );
};

export default App;