import "../../../styles/Home/Atividades-section/style.css"
import CardAtividades from "../../Cards/CardAtividades";
import Title from "../../Title";
import ballet from "../../../assets/Home/icon-ballet.png"
import box from "../../../assets/Home/icon-box.png"
import capoeira from "../../../assets/Home/icon-capoeira.png"
import danca from "../../../assets/Home/icon-danca.png"
import muayThai from "../../../assets/Home/icon-muay.png"

import { Swiper, SwiperSlide } from 'swiper/react'
import { useState } from "react";
import ModalAtividades from "../../Modais/ModalAtividades";
import { UseModalAtividades } from "../../Modais/ModalAtividades/UseModalAtividades.jsx";



const AtividadeSection = () => {

  const modal = UseModalAtividades();


  const [atividadeSelecionada, setAtividadeSelecionada] = useState(null);

  const atividades = [
    { id: '1', name: "Ballet", image: ballet, data: "Segundas e Quartas", horario: "18:00 ás 19:00" },
    { id: '2', name: "Box", image: box, data: "Terças e Quintas", horario: "19:00 ás 20:00" },
    { id: '3', name: "Capoeira", image: capoeira, data: "Quartas e Sextas", horario: "20:00 ás 21:00" },
    { id: '4', name: "Muay Thai", image: muayThai, data: "Segundas e Quartas", horario: "21:00 ás 22:00" },
    { id: '5', name: "Dança", image: danca, data: "Terças e Quintas", horario: "22:00 ás 23:00" },

  ]
  const handleCardClick = (atividade, event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    setAtividadeSelecionada({
      ...atividade,
      position: {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height
      }
    });

    modal.open();
  };


  return (
    <>
      <section className="atividades">
        <Title title="Conheça nossas atividades" />
        <div className="atividades-container">
          <Swiper slidesPerView={4} spaceBetween={20} pagination={{ clickable: true }} navigation>
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
      </section>

      {atividadeSelecionada && (
        <ModalAtividades
          isOpen={modal.isOpen}
          onClose={modal.close}
          aula={atividadeSelecionada.name}
          data={atividadeSelecionada.data}
          horario={atividadeSelecionada.horario}
          position={atividadeSelecionada.position}
        />
      )}
    </>

  )
}

export default AtividadeSection;