import "../../styles/Footer/style.css";
import LogoFooter from "../../assets/Footer/Logo-footer.svg";
import Instagram from "../../assets/Footer/logo-instagram.svg";
import Facebook from "../../assets/Footer/logo-facebook.svg";
import WhatsApp from "../../assets/Footer/logo-whatsapp.svg";
import { Link, useNavigate } from 'react-router-dom';

import { UseModal, Modal, ModalContent, TermosContent, PrivacidadeContent } from '../Modais/ModalTermos';
import { UseModalContato, ModalContato } from '../Modais/ModalContato';


const Footer = () => {
  const navigate = useNavigate();
  const modalContato = UseModalContato();
  const modalTermos = UseModal();
  const modalPrivacidade = UseModal();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleLinkClick = (path) => {
    navigate(path);
    scrollToTop();
  };

  const handleContatoClick = (e) => { 
    e.preventDefault();
    modalContato.open();
  };

  const handleTermosClick = (e) => {
    e.preventDefault();
    modalTermos.open();
  };

  const handlePrivacidadeClick = (e) => {
    e.preventDefault();
    modalPrivacidade.open();
  };
  

  return (
    <>
      <footer>
        <div className="footer-infomacoes">
          <div className="footer-logo">
            <img 
              src={LogoFooter} 
              alt="Logo dos Voluntários Pro Bem" 
              loading="lazy"
              title="Logo Voluntários Pro Bem"
            />

            <div className="footer-social">
  <div className="icon-social">
    <a 
      href="https://www.instagram.com/voluntariosprobem?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      <img src={Instagram} alt="Logo Instagram" loading="lazy" />
    </a>
  </div>

  <div className="icon-social">
    <a 
      href="https://www.facebook.com/voluntariosprobem" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      <img src={Facebook} alt="Logo Facebook" loading="lazy" />
    </a>
  </div>

  <div className="icon-social">
    <a 
      href="https://w.app/axj1qg" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      <img src={WhatsApp} alt="Logo WhatsApp" loading="lazy" />
    </a>
  </div>
</div>

            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.592385615283!2d-46.50071362378758!3d-23.583078762392123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce6798f49c77cd%3A0xaca086453fcbeab6!2sPra%C3%A7a%20Cataguarino!5e0!3m2!1spt-BR!2sbr!4v1756140515023!5m2!1spt-BR!2sbr" 
              width="400" 
              height="300" 
              style={{ border: "0" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="footer-nav">
            <div className="footer-container">
              <h3>Sobre</h3>
              <nav>
                <ul className="footer-links">
                  <li>
                    <a 
                      href="/" 
                      onClick={(e) => { e.preventDefault(); handleLinkClick('/'); }} 
                      className="footer-item"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/eventos" 
                      onClick={(e) => { e.preventDefault(); handleLinkClick('/eventos'); }} 
                      className="footer-item"
                    >
                      Eventos
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/sobre" 
                      onClick={(e) => { e.preventDefault(); handleLinkClick('/sobre'); }} 
                      className="footer-item"
                    >
                      Sobre Nós
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/blog" 
                      onClick={(e) => { e.preventDefault(); handleLinkClick('/blog'); }} 
                      className="footer-item"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/como-ajudar" 
                      onClick={(e) => { e.preventDefault(); handleLinkClick('/como-ajudar'); }} 
                      className="footer-item"
                    >
                      Como Ajudar
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="footer-container">
              <h3>Ajuda</h3>
              <nav>
                <ul className="footer-links">
                   <li>
                <a 
                  href="/fale-conosco" 
                  onClick={handleContatoClick}
                  className="footer-item"
                >
                  Fale Conosco
                </a>
              </li> 
                </ul>
              </nav>
            </div>

            <div className="footer-container">
              <h3>Termos</h3>
              <nav>
                <ul className="footer-links termos">
                  <li>
                    <a
                      href="/politica-privacidade"
                      onClick={handlePrivacidadeClick}
                      className="footer-item"
                    >
                      Política de Privacidade
                    </a>
                  </li>
                  <li>
                    <a
                      href="/termos-servico"
                      onClick={handleTermosClick}
                      className="footer-item"
                    >
                      Termos de Serviço
                    </a>
                  </li>
                </ul>

                {/* Modais */}
                 <ModalContato isOpen={modalContato.isOpen} onClose={modalContato.close} />
                <Modal isOpen={modalTermos.isOpen} onClose={modalTermos.close}>
                  <ModalContent
                    breadcrumb="Home > Termos de Uso"
                    title="TERMOS DE USO"
                    content={TermosContent}
                    onClose={modalTermos.close}
                    linkText="política de privacidade"
                    linkHref={modalPrivacidade.open}
                  />
                </Modal>

                <Modal isOpen={modalPrivacidade.isOpen} onClose={modalPrivacidade.close}>
                  <ModalContent
                    breadcrumb="Home > Política de Privacidade"
                    title="POLÍTICA DE PRIVACIDADE"
                    content={PrivacidadeContent}
                    onClose={modalPrivacidade.close}
                    linkText="Termos de uso"
                    linkHref={modalTermos.open}
                  />
                </Modal>
              </nav>
            </div>
          </div>
        </div>

        <div className="copyright">
          <p>&copy; 2025 Voluntários Torcendo Pro Bem.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
