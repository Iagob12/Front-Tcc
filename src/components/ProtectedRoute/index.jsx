import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './style.css';

/**
 * Componente para proteger rotas que requerem autenticação e/ou role específica
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Componente filho a ser renderizado se autorizado
 * @param {boolean} props.requireAdmin - Se true, requer que o usuário seja ADMIN
 */
export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  // Mostra loading enquanto verifica autenticação
  if (loading) {
    return (
      <div className="protected-route-loading">
        <div className="loading-spinner"></div>
        <p>Verificando permissões...</p>
      </div>
    );
  }

  // Se não está autenticado, redireciona para login
  if (!isAuthenticated) {
    return (
      <div className="protected-route-error">
        <div className="error-content">
          <h1>🔒 Acesso Negado</h1>
          <p>Você precisa estar logado para acessar esta página.</p>
          <p className="error-warning">
            Esta tentativa foi registrada por questões de segurança.
          </p>
          <a href="/cadastrar-se" className="error-button">
            Fazer Login
          </a>
        </div>
      </div>
    );
  }

  // Se requer admin mas o usuário não é admin
  if (requireAdmin && !isAdmin) {
    return (
      <div className="protected-route-error">
        <div className="error-content">
          <h1>⚠️ Acesso Restrito</h1>
          <p>Você não tem permissão para acessar esta página.</p>
          <p className="error-description">
            Esta área é exclusiva para administradores.
          </p>
          <p className="error-warning">
            Esta tentativa foi registrada por questões de segurança.
          </p>
          <a href="/" className="error-button">
            Voltar para Home
          </a>
        </div>
      </div>
    );
  }

  // Se passou em todas as verificações, renderiza o componente
  return children;
}
