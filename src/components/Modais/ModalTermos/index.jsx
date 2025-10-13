import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

import "../../../styles/Modais/ModalTermos/style.css";
import { useNavigate } from 'react-router-dom';

// Hook customizado para controlar o modal
export function UseModal() {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(prev => !prev);

  return { isOpen, open, close, toggle };
}

// Componente Modal reutilizável
export function Modal({ isOpen, onClose, children }) {
  const dialogRef = useRef(null);

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

  return (
    <dialog
      ref={dialogRef}
      className="backdrop:bg-black backdrop:bg-opacity-60 bg-transparent p-0 m-0 max-w-none max-h-none w-full h-full"
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          onClose();
        }
      }}
    >
      <div className="flex items-start justify-center min-h-full p-4 md:p-8">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl my-8 relative">
          {children}
        </div>
      </div>
    </dialog>
  );
}

export function ModalContent({  title, content, onClose, linkText, linkHref }) {
  
  const navigate = useNavigate();

const handleHomeClick = () => {
  onClose();
  navigate('/');
};


  return (
    <>
      {/* Header com breadcrumb e botão fechar */}
      <div className="modal-header">
        <div className="modal-breadcrumb">
          <p>
            <button 
              onClick={handleHomeClick}
              className="breadcrumb-link"
            >
              Home
            </button>
            {' > '}
            <span>{title === 'TERMOS DE USO' ? 'Termos de Uso' : 'Política de Privacidade'}</span>
          </p>
        </div>
        <button onClick={onClose} className="modal-close-btn">
          <X />
        </button>
      </div>

      {/* Conteúdo scrollável */}
      <div className="modal-body">
        <h1 className="modal-title">{title}</h1>
        
        <div className="modal-content-text">
          {content}
        </div>

        {linkText && linkHref && (
          <div className="modal-footer-link">
            <p>
              Por favor, consulte a nossa{' '}
              <button onClick={linkHref}>
                {linkText}
              </button>
            </p>
          </div>
        )}
      </div>
    </>
  );
}

// Conteúdos dos modais (exportados para uso em outras páginas)
export const TermosContent = (
  <>
    <div className="mb-4">
      <h2 className="font-bold text-gray-900 mb-2">1. Termos</h2>
      <p>
       Ao acessar ao site ONG VOLUNTARIOS PRO BEM, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.
      </p>
    </div>

    <div className="mb-4">
      <h2 className="font-bold text-gray-900 mb-2">2. Uso de Licença</h2>
      <p>
        É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site ONG VOLUNTARIOS PRO BEM , apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:modificar ou copiar os materiais usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial);tentar descompilar ou fazer engenharia reversa de qualquer software contido no site ONG VOLUNTARIOS PRO BEM remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou transferir os materiais para outra pessoa ou 'espelhe' os materiais em qualquer outro servidor.Esta licença será automaticamente rescindida se você violar alguma dessas restrições e poderá ser rescindida por ONG VOLUNTARIOS PRO BEM a qualquer momento. Ao encerrar a visualização desses materiais ou após o término desta licença, você deve apagar todos os materiais baixados em sua posse, seja em formato eletrónico ou impresso.
      </p>
    </div>

    <div className="mb-4">
      <h2 className="font-bold text-gray-900 mb-2">3. Isenção de responsabilidade</h2>
      <p>
        Os materiais no site da ONG VOLUNTARIOS PRO BEM são fornecidos 'como estão'. ONG VOLUNTARIOS PRO BEM não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.Além disso, o ONG VOLUNTARIOS PRO BEM não garante ou faz qualquer representação relativa à precisão, aos resultados prováveis ou à confiabilidade do uso dos materiais em seu site ou de outra forma relacionado a esses materiais ou em sites vinculados a este site.
      </p>
    </div>

    <div className="mb-4">
      <h2 className="font-bold text-gray-900 mb-2">4. Limitações</h2>
      <p>
        Em nenhum caso o ONG VOLUNTARIOS PRO BEM ou seus fornecedores serão responsáveis por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em ONG VOLUNTARIOS PRO BEM, mesmo que ONG VOLUNTARIOS PRO BEM ou um representante autorizado da ONG VOLUNTARIOS PRO BEM tenha sido notificado oralmente ou por escrito da possibilidade de tais danos. Como algumas jurisdições não permitem limitações em garantias implícitas, ou limitações de responsabilidade por danos conseqüentes ou incidentais, essas limitações podem não se aplicar a você.
      </p>
    </div>

    <div className="mb-4">
      <h2 className="font-bold text-gray-900 mb-2">5. Precisão dos materiais</h2>
      <p>
       Os materiais exibidos no site da ONG VOLUNTARIOS PRO BEM podem incluir erros técnicos, tipográficos ou fotográficos. ONG VOLUNTARIOS PRO BEM não garante que qualquer material em seu site seja preciso, completo ou atual. ONG VOLUNTARIOS PRO BEM pode fazer alterações nos materiais contidos em seu site a qualquer momento, sem aviso prévio. No entanto, ONG VOLUNTARIOS PRO BEM não se compromete a atualizar os materiais.
      </p>
    </div>

    <div className="mb-4">
      <h2 className="font-bold text-gray-900 mb-2">6. Links</h2>
      <p>
        A ONG VOLUNTARIOS PRO BEM não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso por ONG VOLUNTARIOS PRO BEM do site. O uso de qualquer site vinculado é por conta e risco do usuário.ModificaçõesO ONG VOLUNTARIOS PRO BEM pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.Lei aplicávelEstes termos e condições são regidos e interpretados de acordo com as leis do ONG VOLUNTARIOS PRO BEM e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.
      </p>
    </div>
  </>
);

export const PrivacidadeContent = (
  <>
    <p className="mb-4">
      A sua privacidade é importante para nós. É política do ONG VOLUNTARIOS PRO BEM respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site ONG VOLUNTARIOS PRO BEM, e outros sites que possuímos e operamos.Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contacto connosco.O serviço Google AdSense que usamos para veicular publicidade usa um cookie DoubleClick para veicular anúncios mais relevantes em toda a Web e limitar o número de vezes que um determinado anúncio é exibido para você.Para mais informações sobre o Google AdSense, consulte as FAQs oficiais sobre privacidade do Google AdSense.Utilizamos anúncios para compensar os custos de funcionamento deste site e fornecer financiamento para futuros desenvolvimentos. Os cookies de publicidade comportamental usados por este site foram projetados para garantir que você forneça os anúncios mais relevantes sempre que possível, rastreando anonimamente seus interesses e apresentando coisas semelhantes que possam ser do seu interesse.Vários parceiros anunciam em nosso nome e os cookies de rastreamento de afiliados simplesmente nos permitem ver se nossos clientes acessaram o site através de um dos sites de nossos parceiros, para que possamos creditá-los adequadamente e, quando aplicável, permitir que nossos parceiros afiliados ofereçam qualquer promoção que pode fornecê-lo para fazer uma compra.Compromisso do UsuárioO usuário se compromete a fazer uso adequado dos conteúdos e da informação que o ONG VOLUNTARIOS PRO BEM oferece no site e com caráter enunciativo, mas não limitativo:A) Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem pública;B) Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, jogos de sorte ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;C) Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do ONG VOLUNTARIOS PRO BEM, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente mencionados.Mais informaçõesEsperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.
Esta política é efetiva a partir de 18 August 2025 15:30
    </p>

    
  </>
);

// Exemplo de uso no Footer
export default function ExemploFooter() {
  const modalTermos = UseModal();
  const modalPrivacidade = UseModal();

  const handleTermosClick = (e) => {
    e.preventDefault();
    modalTermos.open();
  };

  const handlePrivacidadeClick = (e) => {
    e.preventDefault();
    modalPrivacidade.open();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Conteúdo da página */}
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Sua Página
          </h1>
          <p className="text-gray-600">
            Role até o footer para ver os links
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <ul className="footer-links termos flex flex-wrap gap-4 justify-center">
            <li>
              <a 
                href="/politica-privacidade" 
                onClick={handlePrivacidadeClick}
                className="footer-item hover:text-gray-300 transition-colors cursor-pointer"
              >
                Política de Privacidade
              </a>
            </li>
            <li>
              <a 
                href="/termos-servico" 
                onClick={handleTermosClick}
                className="footer-item hover:text-gray-300 transition-colors cursor-pointer"
              >
                Termos de Serviço
              </a>
            </li>
          </ul>
        </div>
      </footer>

      {/* Modal Termos de Uso */}
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

      {/* Modal Política de Privacidade */}
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
    </div>
  );
}