import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OAuth2Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🔄 OAuth2Callback - Disparando evento loginSuccess");
    // O cookie já foi definido pelo backend OAuth2SuccessHandler
    // Apenas redirecionar para a home e disparar evento de login
    window.dispatchEvent(new Event('loginSuccess'));
    
    setTimeout(() => {
      console.log("🏠 Redirecionando para home");
      navigate('/', { replace: true });
    }, 500);
  }, [navigate]);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ color: '#B20000', marginBottom: '1rem' }}>
          Processando login...
        </h2>
        <p style={{ color: '#808080' }}>
          Aguarde enquanto redirecionamos você.
        </p>
      </div>
    </div>
  );
}
