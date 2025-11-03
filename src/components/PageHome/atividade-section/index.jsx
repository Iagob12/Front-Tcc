import "../../../styles/Home/Atividades-section/style.css";
import CardAtividades from "../../Cards/CardAtividades";
import Title from "../../Title";
import ballet from "../../../assets/Home/icon-ballet.png";
import box from "../../../assets/Home/icon-box.png";
import capoeira from "../../../assets/Home/icon-capoeira.png";
import danca from "../../../assets/Home/icon-danca.png";
import muayThai from "../../../assets/Home/icon-muay.png";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useRef } from "react";
import ModalAtividades from "../../Modais/ModalAtividades";
import ModalAtividadeInscricao from "../../Modais/ModalAtividadesInscricao"; 
import { UseModalAtividades } from "../../Modais/ModalAtividades/UseModalAtividades.jsx";
import { useAuth } from "../../../hooks/useAuth";

const AtividadeSection = () => {
  const modalAtividade = UseModalAtividades();
  const modalInscricao = UseModalAtividades();
  const { isAdmin } = useAuth();

  const [atividadeSelecionada, setAtividadeSelecionada] = useState(null);
  const swiperRef = useRef(null);

  const atividades = [
    { id: "1", name: "Ballet", image: ballet, data: "Segundas e Quartas", horario: "18:00 às 19:00", vagas: 20 },
    { id: "2", name: "Box", image: box, data: "Terças e Quintas", horario: "19:00 às 20:00", vagas: 15 },
    { id: "3", name: "Capoeira", image: capoeira, data: "Quartas e Sextas", horario: "20:00 às 21:00", vagas: 25 },
    { id: "4", name: "Muay Thai", image: muayThai, data: "Segundas e Quartas", horario: "21:00 às 22:00", vagas: 18 },
    { id: "5", name: "Dança", image: danca, data: "Terças e Quintas", horario: "22:00 às 23:00", vagas: 30 },
  ];

  const handleCardClick = (atividade, event) => {
    event?.stopPropagation();
    
    const cardElement = event.currentTarget;
    const rect = cardElement.getBoundingClientRect();
    
    setAtividadeSelecionada({
      ...atividade,
      position: {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      }
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
          <Swiper 
            ref={swiperRef}
            slidesPerView={4} 
            spaceBetween={20} 
            pagination={{ clickable: true }} 
            navigation
            allowTouchMove={true}
            preventClicks={false}
            preventClicksPropagation={false}
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
        />
      )}
    </>
  );
};

export default AtividadeSection;