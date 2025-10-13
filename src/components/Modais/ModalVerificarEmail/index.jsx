import { useState, useEffect, useRef } from 'react';
import { X, Mail, RefreshCw } from 'lucide-react';
import "../../../styles/Modais/ModalVerificacao/style.css";

export function UseModalVerificarEmail() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');

  const open = (userEmail) => {
    setEmail(userEmail);
    setIsOpen(true);
  };
  const close = () => setIsOpen(false);

  return { isOpen, open, close, email };
}

export function ModalVerificarEmail({ isOpen, onClose, email, onSuccess }) {
  const dialogRef = useRef(null);
  const [codigo, setCodigo] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
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
      setCodigo('');
      setMessage('');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  const handleVerificar = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch("https://backend-tcc-cgbwa9c6gjd5bjfr.brazilsouth-01.azurewebsites.net/auth/verify-email-modern", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, codigo })
      });

      if (response.ok) {
        setMessage('Email verificado com sucesso!');
        setTimeout(() => {
          onSuccess?.();
          onClose();
        }, 1500);
      } else {
        const error = await response.json();
        setMessage(error.message || 'Código inválido ou expirado');
      }
    } catch (error) {
      console.error('Erro:', error);
      setMessage('Erro ao verificar código');
    } finally {
      setLoading(false);
    }
  };

  const handleReenviar = async () => {
    setResending(true);
    setMessage('');

    try {
      const response = await fetch("https://backend-tcc-cgbwa9c6gjd5bjfr.brazilsouth-01.azurewebsites.net/auth/resend-verification", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setMessage('Novo código enviado para seu email!');
      } else {
        setMessage('Erro ao reenviar código');
      }
    } catch (error) {
      console.error('Erro:', error);
      setMessage('Erro ao reenviar código');
    } finally {
      setResending(false);
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
      <div className="modal-wrapper-verificacao">
        <div className="modal-card modal-verificacao">
          {/* Header */}
          <div className="modal-header">
            <div className="modal-icon">
              <Mail size={32} />
            </div>
            <button onClick={onClose} className="modal-close-btn">
              <X />
            </button>
          </div>

          {/* Body */}
          <div className="modal-body">
            <h1 className="modal-title">Verificar Email</h1>
            <p className="modal-subtitle">
              Enviamos um código de verificação para<br />
              <strong>{email}</strong>
            </p>

            <form onSubmit={handleVerificar} className="verification-form">
              <div className="form-group">
                <label htmlFor="codigo">Código de Verificação</label>
                <input
                  type="text"
                  id="codigo"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  placeholder="Digite o código de 6 dígitos"
                  maxLength="6"
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

              <div className="form-actions">
                <button 
                  type="submit" 
                  className="btn-submit"
                  disabled={loading || codigo.length < 6}
                >
                  {loading ? 'Verificando...' : 'Verificar'}
                </button>

                <button
                  type="button"
                  onClick={handleReenviar}
                  className="btn-resend"
                  disabled={resending}
                >
                  <RefreshCw size={16} />
                  {resending ? 'Reenviando...' : 'Reenviar código'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  );
}
