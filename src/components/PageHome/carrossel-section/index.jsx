import "../../../styles/Home/Carrossel-section/style.css"
import Title from "../../Title"
import Button from "../../Button"
import Carrossel01 from "../../../assets/Home/carrossel-transformando.svg"
import Carrossel02 from "../../../assets/Home/carrossel-doacao.svg"
import Carrossel03 from "../../../assets/Home/carrossel-roupas.svg"
import CarrosselHome from "../../Carrossel/Carrossel-home"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade'
import { Link } from "react-router-dom"

const CarrosselSection = () =>{

        const imagens = [
        { id: 1, src: Carrossel01, alt: 'um homem ajudando uma senhora de tranças' },
        { id: 2, src: Carrossel02, alt: 'várias mãos juntas, uma em cima da outra' },
        { id: 3, src: Carrossel03, alt: 'duas mulheres escolhendo roupas' },
    ];

    return(
        <>
        <section className="carrosel-section">

            <div className="carrossel-container">
                <Title title="Transformando vidas"/>
                <div className="carrossel-content">
                      <Swiper
                        modules={[Autoplay, Pagination, EffectFade]} // Adicione EffectFade
                        loop={true}
                        effect="fade" 
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        pagination={{
                            clickable: true,
                            el: '.swiper-pagination',
                            bulletClass: 'swiper-pagination-bullet',
                            bulletActiveClass: 'swiper-pagination-bullet-active',
                        }}
                        className="meu-carrossel"
                    >
                        {imagens.map((imagem) => (
                            <SwiperSlide key={imagem.id}>
                                <CarrosselHome image={imagem.src} alt={imagem.alt} />
                            </SwiperSlide>
                        ))}
                        <div className="swiper-pagination"></div>
                    </Swiper>
                </div>
                <Link to="/sobre">
               <Button 
                text= "Conheça nossa história"
                primary={true}/>
                </Link>
            </div>
            
        </section>
        </>
    )
}
export default CarrosselSection