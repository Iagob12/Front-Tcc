import "../../../styles/Home/Atividades-section/style.css";
import CardAtividades from "../../Cards/CardAtividades";
import Title from "../../Title";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useState, useRef, useEffect } from "react";
import 'swiper/css';
import 'swiper/css/pagination';
import ModalAtividades from "../../Modais/ModalAtividades";
import ModalAtividadeInscricao from "../../Modais/ModalAtividadesInscricao";
import { UseModalAtividades } from "../../Modais/ModalAtividades/UseModalAtividades.jsx";
import { useAuth } from "../../../hooks/useAuth";
import defaultImg from "../../../assets/default-imgs/default-atividade.png";
import { apiGet } from "../../../config/api";

const AtividadeSection = () => {
  const modalAtividade = UseModalAtividades();
  const modalInscricao = UseModalAtividades();
  const { isAdmin } = useAuth();

  const [atividadeSelecionada, setAtividadeSelecionada] = useState(null);
  const [atividades, setAtividades] = useState([]);
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchAtividades = async () => {
      try {
        const response = await apiGet("/curso/listar");
        if (response.ok) {
          const dados = await response.json();

          const atividadesFormatadas = dados.map((item) => ({
            id: item.id,
            name: item.titulo,
            image: defaultImg,
            data: item.dias,
            horario: item.horario,
            vagas: item.vagas,
          }));

          setAtividades(atividadesFormatadas);
        } else {
          console.error("Erro ao listar atividades:", response.status);
        }
      } catch (error) {
        console.error("Erro ao conectar com a API:", error);
      }
    };

    fetchAtividades();
  }, []);

  const usarSwiper = atividades.length >= 5;

  const handleCardClick = (atividade, event) => {
    event?.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();

    setAtividadeSelecionada({
      ...atividade,
      position: {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      },
      cursoId: atividade.id,
    });
    modalAtividade.open();
  };

  const handleInscrever = () => {
    modalAtividade.close();
    modalInscricao.open();
  };

  return (
    <>
      <section className="atividades">
        <Title title="Conheça nossas atividades" />
        <div className="atividades-container">
          {atividades.length === 0 ? (
            <div className="sem-atividades">
              <p>Sem atividades disponíveis no momento!</p>
            </div>
          ) : usarSwiper ? (
            <Swiper
              ref={swiperRef}
              modules={[Pagination]}
              slidesPerView={1.2}
              centeredSlides={true}
              spaceBetween={16}
              pagination={{ clickable: true, dynamicBullets: true }}
              allowTouchMove={true}
              preventClicks={false}
              preventClicksPropagation={false}
              breakpoints={{
                480: { slidesPerView: 2, centeredSlides: false, spaceBetween: 20 },
                768: { slidesPerView: 3, centeredSlides: false, spaceBetween: 20 },
                1024: { slidesPerView: 4, centeredSlides: false, spaceBetween: 20 }
              }}
            >
              {atividades.map((atividade) => (
                <SwiperSlide key={atividade.id}>
                  <CardAtividades
                    image={atividade.image}
                    name={atividade.name}
                    onClick={(event) => handleCardClick(atividade, event)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="atividades-grid">
              {atividades.map((atividade) => (
                <CardAtividades
                  key={atividade.id}
                  image={atividade.image}
                  name={atividade.name}
                  onClick={(event) => handleCardClick(atividade, event)}
                />
              ))}
            </div>
          )}
        </div>

        {isAdmin && (
          <Link to="/adicionar-atividade" id="btn-blog" className="btn-link">
            + Adicionar atividade
          </Link>
        )}
      </section>

      {atividadeSelecionada && (
        <ModalAtividades
          isOpen={modalAtividade.isOpen}
          onClose={modalAtividade.close}
          aula={atividadeSelecionada.name}
          data={atividadeSelecionada.data}
          horario={atividadeSelecionada.horario}
          position={atividadeSelecionada.position}
          onInscrever={handleInscrever}
        />
      )}

      {atividadeSelecionada && (
        <ModalAtividadeInscricao
          isOpen={modalInscricao.isOpen}
          onClose={modalInscricao.close}
          atividade={atividadeSelecionada.name}
          vagas={atividadeSelecionada.vagas}
          cursoId={atividadeSelecionada.cursoId}
        />
      )}
    </>
  );
};

export default AtividadeSection;
