import { useEffect, useRef } from "react";
import Button from "../../Button";
import "../../../styles/Modais/modalAtividadeInscricao/style.css";
import { apiPost, apiDelete } from "../../../config/api";
import { useToast } from '../../Toast/useToast';
import ToastContainer from '../../Toast/ToastContainer';
import { useAuth } from "../../../hooks/useAuth";

const ModalAtividadeInscricao = ({ isOpen, onClose, atividade, onInscricaoSucesso }) => {
  const modalRef = useRef(null);
  const toast = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [jaInscrito, setJaInscrito] = useState(false);
  const [vagasDisponiveis, setVagasDisponiveis] = useState(0);

  useEffect(() => {
    if (atividade) {
      // Calcular vagas disponíveis (total - inscritos)
      // Por enquanto, vamos usar o total de vagas, mas você pode melhorar isso
      // buscando o número real de inscrições
      setVagasDisponiveis(atividade.vagas);
    }
  }, [atividade]);
import { apiPost } from "../../../config/api"; // sua função fetch POST

const ModalAtividadeInscricao = ({ isOpen, onClose, atividade, cursoId, vagas }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const handleInscrever = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.warning("Você precisa estar logado para se inscrever.");
      return;
    }

    if (loading) return;

    setLoading(true);

    try {
      const response = await apiPost('/inscricao/inscrever', {
        idAtividade: atividade.id
      });

      if (response.ok) {
        toast.success(`Inscrição realizada com sucesso na atividade: ${atividade.nome}!`);
        setJaInscrito(true);
        if (onInscricaoSucesso) {
          onInscricaoSucesso();
        }
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        const error = await response.json();
        toast.error(error.message || "Erro ao realizar inscrição.");
      }
    } catch (error) {
      console.error("Erro ao inscrever:", error);
      toast.error("Erro ao realizar inscrição. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelarInscricao = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await apiDelete(`/inscricao/cancelar/${atividade.id}`);

      if (response.ok) {
        toast.success("Inscrição cancelada com sucesso!");
        setJaInscrito(false);
        if (onInscricaoSucesso) {
          onInscricaoSucesso();
        }
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        const error = await response.json();
        toast.error(error.message || "Erro ao cancelar inscrição.");
      }
    } catch (error) {
      console.error("Erro ao cancelar inscrição:", error);
      toast.error("Erro ao cancelar inscrição. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !atividade) return null;

  const podeInscrever = user && !jaInscrito && vagasDisponiveis > 0;

  return (
    <>
      <ToastContainer toasts={toast.toasts} removeToast={toast.removeToast} />
      <div className="modal-inscricao-overlay">
        <div ref={modalRef} className="modal-inscricao-container">
          <h3>Inscreva-se na atividade</h3>
          <p className="atividade-nome">{atividade.nome}</p>
          <p className="vagas-disponiveis">
            Vagas disponíveis: <strong>{vagasDisponiveis}</strong>
          </p>
          
          {!user && (
            <p style={{ color: '#ff9800', marginTop: '10px' }}>
              Você precisa estar logado para se inscrever.
            </p>
          )}


          {vagasDisponiveis === 0 && (
            <p style={{ color: '#f44336', marginTop: '10px' }}>
              Não há vagas disponíveis para esta atividade.
            </p>
          )}

          {jaInscrito ? (
            <div style={{ marginTop: '20px' }}>
              <p style={{ color: '#4caf50', marginBottom: '15px' }}>
                Você já está inscrito nesta atividade!
              </p>
              <Button 
                text={loading ? "Cancelando..." : "Cancelar Inscrição"} 
                onClick={handleCancelarInscricao}
                disabled={loading}
              />
            </div>
          ) : (
            <form onSubmit={handleInscrever}>
              <Button 
                type="submit"
                text={loading ? "Inscrevendo..." : "Confirmar Inscrição"} 
                disabled={!podeInscrever || loading}
              />
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default ModalAtividadeInscricao;
