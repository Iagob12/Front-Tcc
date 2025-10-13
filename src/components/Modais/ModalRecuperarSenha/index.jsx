import { useState, useEffect, useRef } from 'react';
import { X, Lock, Mail } from 'lucide-react';
import "../../../styles/Modais/ModalRecuperacao/style.css";
import { apiPost } from '../../../config/api';

export function UseModalRecuperarSenha() {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return { isOpen, open, close };
}

export function ModalRecuperarSenha({ isOpen, onClose }) {
  const dialogRef = useRef(null);
  const [step, setStep] = useState(1); // 1: solicitar, 2: inserir código e nova senha
  const [formData, setFormData] = useState({
    email: '',
    codigo: '',
    novaSenha: '',
    confirmarSenha: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
      document.body.classList.add('modal-open');
    } else {
      dialog.close();
      document.body.classList.remove('modal-open');
      // Reset ao fechar
      setStep(1);
      setFormData({
        email: '',
        codigo: '',
        novaSenha: '',
        confirmarSenha: ''
      });
      setMessage('');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSolicitarCodigo = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await apiPost('/auth/request-password-reset', { email: formData.email });

      if (response.ok) {
        setMessage('Código enviado para seu email!');
        setTimeout(() => {
          setStep(2);
          setMessage('');
        }, 1500);
      } else {
        const error = await response.json();
        setMessage(error.message || 'Email não encontrado');
      }
    } catch (error) {
      console.error('Erro:', error);
      setMessage('Erro ao solicitar código');
    } finally {
      setLoading(false);
    }
  };

  const handleRedefinirSenha = async (e) => {
    e.preventDefault();
    
    if (formData.novaSenha !== formData.confirmarSenha) {
      setMessage('As senhas não coincidem');
      return;
    }

    if (formData.novaSenha.length < 6) {
      setMessage('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await apiPost('/auth/reset-password', {
        email: formData.email,
        token: formData.codigo,
        novaSenha: formData.novaSenha
      });

      if (response.ok) {
        setMessage('Senha redefinida com sucesso!');
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        const error = await response.json();
        setMessage(error.message || 'Código inválido ou expirado');
      }
    } catch (error) {
      console.error('Erro:', error);
      setMessage('Erro ao redefinir senha');
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="modal-dialog"
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          onClose();
        }
      }}
    >
      <div className="modal-wrapper-recuperacao">
        <div className="modal-card modal-recuperacao">
          {/* Header */}
          <div className="modal-header">
            <div className="modal-icon">
              <Lock size={32} />
            </div>
            <button onClick={onClose} className="modal-close-btn">
              <X />
            </button>
          </div>

          {/* Body */}
          <div className="modal-body">
            <h1 className="modal-title">Recuperar Senha</h1>

            {step === 1 ? (
              <>
                <p className="modal-subtitle">
                  Digite seu email para receber o código de recuperação
                </p>

                <form onSubmit={handleSolicitarCodigo} className="recovery-form">
                  <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      required
                      className="form-input"
                      autoFocus
                    />
                  </div>

                  {message && (
                    <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
                      {message}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className="btn-submit"
                    disabled={loading}
                  >
                    {loading ? 'Enviando...' : 'Enviar Código'}
                  </button>
                </form>
              </>
            ) : (
              <>
                <p className="modal-subtitle">
                  Digite o código enviado para <strong>{formData.email}</strong> e sua nova senha
                </p>

                <form onSubmit={handleRedefinirSenha} className="recovery-form">
                  <div className="form-group">
                    <label htmlFor="codigo">Código de Recuperação</label>
                    <input
                      type="text"
                      id="codigo"
                      name="codigo"
                      value={formData.codigo}
                      onChange={handleChange}
                      placeholder="Digite o código de 6 dígitos"
                      maxLength="6"
                      required
                      className="form-input"
                      autoFocus
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="novaSenha">Nova Senha</label>
                    <input
                      type="password"
                      id="novaSenha"
                      name="novaSenha"
                      value={formData.novaSenha}
                      onChange={handleChange}
                      placeholder="Mínimo 6 caracteres"
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmarSenha">Confirmar Senha</label>
                    <input
                      type="password"
                      id="confirmarSenha"
                      name="confirmarSenha"
                      value={formData.confirmarSenha}
                      onChange={handleChange}
                      placeholder="Digite a senha novamente"
                      required
                      className="form-input"
                    />
                  </div>

                  {message && (
                    <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
                      {message}
                    </div>
                  )}

                  <div className="form-actions">
                    <button 
                      type="submit" 
                      className="btn-submit"
                      disabled={loading}
                    >
                      {loading ? 'Redefinindo...' : 'Redefinir Senha'}
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="btn-back"
                    >
                      Voltar
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}
