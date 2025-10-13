import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

import "../../../styles/Modais/ModalContato/style.css";


export function UseModalContato() {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(prev => !prev);

  return { isOpen, open, close, toggle };
}

// Componente Modal de Contato
export function ModalContato({ isOpen, onClose }) {
  const dialogRef = useRef(null);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    numero: '',
    mensagem: ''
  });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    } else {
      dialog.close();
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => onClose();
    dialog.addEventListener('close', handleClose);

    return () => dialog.removeEventListener('close', handleClose);
  }, [onClose]);

  const handleHomeClick = () => {
    onClose();
    // window.location.href = '/';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulário enviado:', formData);
    
    // Aqui você pode adicionar a lógica de envio do formulário
    // Por exemplo, chamar uma API
    
    // Limpar formulário após envio
    setFormData({
      nome: '',
      email: '',
      numero: '',
      mensagem: ''
    });
    
    alert('Mensagem enviada com sucesso!');
    onClose();
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
      <div className="modal-wrapper-contato">
        <div className="modal-card modal-contato">
          {/* Header */}
          <div className="modal-header">
            <div className="modal-breadcrumb">
              <p>
                <button onClick={handleHomeClick} className="breadcrumb-link">
                  Home
                </button>
                {' > '}
                <span>Fale Conosco</span>
              </p>
            </div>
            <button onClick={onClose} className="modal-close-btn">
              <X />
            </button>
          </div>

          {/* Body */}
          <div className="modal-body">
            <h1 className="modal-title">FORMULÁRIO DE CONTATO</h1>

            <form onSubmit={handleSubmit} className="contact-form">
              {/* Nome completo */}
              <div className="form-group">
                <label htmlFor="nome">Nome completo</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Escreva seu nome"
                  required
                  className="form-input"
                />
              </div>

              {/* E-mail */}
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email@gmail.com"
                  required
                  className="form-input"
                />
              </div>

              {/* Número */}
              <div className="form-group">
                <label htmlFor="numero">Número</label>
                <input
                  type="tel"
                  id="numero"
                  name="numero"
                  value={formData.numero}
                  onChange={handleChange}
                  placeholder="Ex: dd xxxxx-xxxx"
                  className="form-input"
                />
              </div>

              {/* Mensagem */}
              <div className="form-group">
                <label htmlFor="mensagem">Mensagem</label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  placeholder="Escreva escreva aqui a mensagem"
                  required
                  rows="5"
                  className="form-textarea"
                />
              </div>

              {/* Botão Enviar */}
              <div className="form-submit">
                <button type="submit" className="btn-submit">
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  );
}

// Exemplo de uso
export default function ExemploFaleConosco() {
  const modalContato = UseModalContato();

  const handleContatoClick = (e) => {
    e.preventDefault();
    modalContato.open();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Página Principal
          </h1>
          <p className="text-gray-600 mb-8">
            Clique no link do footer para abrir o formulário
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="footer-container">
            <h3 className="text-lg font-semibold mb-4">Ajuda</h3>
            <nav>
              <ul className="footer-links">
                <li>
                  <a
                    href="/fale-conosco"
                    onClick={handleContatoClick}
                    className="footer-item hover:text-gray-300 transition-colors cursor-pointer"
                  >
                    Fale Conosco
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>

      {/* Modal Fale Conosco */}
      <ModalContato isOpen={modalContato.isOpen} onClose={modalContato.close} />
    </div>
  );
}