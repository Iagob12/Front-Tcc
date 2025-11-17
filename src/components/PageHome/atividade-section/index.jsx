import "../../../styles/Home/Atividades-section/style.css";
import CardAtividades from "../../Cards/CardAtividades";
import Title from "../../Title";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useState, useRef, useEffect } from "react";
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from "react-router-dom";
import ModalAtividades from "../../Modais/ModalAtividades";
import ModalAtividadeInscricao from "../../Modais/ModalAtividadesInscricao";
import { UseModalAtividades } from "../../Modais/ModalAtividades/UseModalAtividades.jsx";
import { useAuth } from "../../../hooks/useAuth";
import { apiGet, apiDelete, getImageUrl } from "../../../config/api";
import { useToast } from '../../Toast/useToast';
import ToastContainer from '../../Toast/ToastContainer';
import { FaTrash } from 'react-icons/fa';

const AtividadeSection = () => {
  const modalAtividade = UseModalAtividades();
  const modalInscricao = UseModalAtividades();
  const { isAdmin } = useAuth();
  const toast = useToast();

  const [atividades, setAtividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [atividadeSelecionada, setAtividadeSelecionada] = useState(null);
  const [deletingAtividadeId, setDeletingAtividadeId] = useState(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    carregarAtividades();
  }, []);

  const carregarAtividades = async () => {
    try {
      setLoading(true);
      console.log('Carregando atividades...');
      const response = await apiGet('/atividade/listar');
      
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      if (response.ok) {
        const dados = await response.json();
        console.log('Atividades recebidas:', dados);
        setAtividades(Array.isArray(dados) ? dados : []);
      } else {
        const errorText = await response.text();
        console.error('Erro na resposta:', response.status, errorText);
        toast.error(`Erro ao carregar atividades (${response.status}).`);
      }
    } catch (error) {
      console.error("Erro ao carregar atividades:", error);
      toast.error("Erro ao carregar atividades. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };


  const formatarHorario = (horario) => {
    if (!horario) return "";
    // Se for string, tenta extrair HH:mm
    if (typeof horario === 'string') {
      // Se já está no formato "HH:mm:ss", pega apenas "HH:mm"
      if (horario.length >= 5) {
        return horario.substring(0, 5);
      }
      return horario;
    }
    // Se for objeto (LocalTime do backend), formata
    if (typeof horario === 'object' && horario.hour !== undefined) {
      const hour = String(horario.hour).padStart(2, '0');
      const minute = String(horario.minute || 0).padStart(2, '0');
      return `${hour}:${minute}`;
    }
    return "";
  };

  const handleCardClick = (atividade, event) => {
    event?.stopPropagation();
    event?.preventDefault();
    
    const cardElement = event.currentTarget;
    const rect = cardElement.getBoundingClientRect();

    setAtividadeSelecionada({
      ...atividade,
      position: {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      },
      cursoId: atividade.id
    });
    modalAtividade.open();
  };

  const handleInscrever = () => {
    modalAtividade.close();
    modalInscricao.open();
  };

  const handleDeleteAtividade = async (atividadeId, e) => {
    e.stopPropagation();
    
    if (!window.confirm("Tem certeza que deseja excluir esta atividade? Esta ação não pode ser desfeita.")) {
      return;
    }

    setDeletingAtividadeId(atividadeId);
    try {
      const response = await apiDelete(`/atividade/deletar/${atividadeId}`);
      if (response.ok) {
        toast.success("Atividade excluída com sucesso!");
        carregarAtividades();
      } else {
        const error = await response.json();
        toast.error(error.message || "Erro ao excluir a atividade.");
      }
    } catch (error) {
      console.error("Erro ao excluir atividade:", error);
      toast.error("Erro ao excluir a atividade.");
    } finally {
      setDeletingAtividadeId(null);
    }
  };

  if (loading) {
    return (
      <section className="atividades">
        <Title title="Conheça nossas atividades" />
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Carregando atividades...</p>
        </div>
      </section>
    );
  }

  if (atividades.length === 0) {
    return (
      <section className="atividades">
        <Title title="Conheça nossas atividades" />
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Nenhuma atividade cadastrada ainda.</p>
          {isAdmin && (
            <Link to="/adicionar-atividade" id="btn-blog" className="btn-link" style={{ marginTop: '20px', display: 'inline-block' }}>
              + Adicionar primeira atividade
            </Link>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="atividades">
      <ToastContainer toasts={toast.toasts} removeToast={toast.removeToast} />
      <Title title="Conheça nossas atividades" />
      <div className="atividades-container">
        <Swiper 
          ref={swiperRef}
          modules={[Pagination]}
          slidesPerView={1.2}
          centeredSlides={true}
          spaceBetween={16} 
          pagination={{ 
            clickable: true,
            dynamicBullets: true
          }}
          allowTouchMove={true}
          preventClicks={false}
          preventClicksPropagation={false}
          breakpoints={{
            480: {
              slidesPerView: 2,
              centeredSlides: false,
              spaceBetween: 20
            },
            768: {
              slidesPerView: 3,
              centeredSlides: false,
              spaceBetween: 20
            },
            1024: {
              slidesPerView: 4,
              centeredSlides: false,
              spaceBetween: 20
            }
          }}
        >
          {atividades.map((atividade) => (
            <SwiperSlide key={atividade.id} style={{ position: 'relative' }}>
              <CardAtividades
                image={atividade.imagem ? getImageUrl(atividade.imagem) : null}
                name={atividade.nome}
                onClick={(event) => handleCardClick(atividade, event)}
              />
              {isAdmin && (
                <button
                  className="btn-delete-atividade"
                  onClick={(e) => handleDeleteAtividade(atividade.id, e)}
                  disabled={deletingAtividadeId === atividade.id}
                  title="Excluir atividade"
                >
                  <FaTrash />
                </button>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
      {isAdmin && (
        <Link to="/adicionar-atividade" id="btn-blog" className="btn-link">
          + Adicionar atividade
        </Link>
      )}

      {atividadeSelecionada && (
        <ModalAtividades
          isOpen={modalAtividade.isOpen}
          onClose={modalAtividade.close}
          aula={atividadeSelecionada.nome || ""}
          data={atividadeSelecionada.dias || ""}
          horario={formatarHorario(atividadeSelecionada.horario) || ""}
          position={atividadeSelecionada.position}
          onInscrever={handleInscrever}
        />
      )}

      {atividadeSelecionada && (
        <ModalAtividadeInscricao
          isOpen={modalInscricao.isOpen}
          onClose={modalInscricao.close}
          atividade={atividadeSelecionada}
          onInscricaoSucesso={carregarAtividades}
        />
      )}
    </section>
  );
};

export default AtividadeSection;
