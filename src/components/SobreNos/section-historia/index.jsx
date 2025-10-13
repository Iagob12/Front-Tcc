import React from "react";
import "../../../styles/SobreNos/section-historia/style.css"
import Title from "../../Title";
import Familia from "../../../assets/SobreNos/foto-familia.svg"
import AnimatedSection from "../../AnimatedSection";

const SectionHistoria = ({ id }) => {
    return(
        <>
            <section id={id} className="section-historia">
                <div className="container-historia" >
                    <Title title= "Nossa História"/>
                    <AnimatedSection delay={0.4}>
                    <div className="historia-content">
                        <img src={Familia} alt= "foto quatro pessoas, três mulheres e um homem usando a camiseta da ONG" loading="lazy"/>
                        <p>A <span>ONG Voluntários Torcendo Pro Bem</span> foi fundada em 2015 por um grupo de amigos com o objetivo de <span>ajudar pessoas</span> em situação de rua, através da entrega de sopas e roupas todas as terças-feiras à noite. Com o tempo, o projeto cresceu e passou a realizar ações solidárias em datas comemorativas como <span>  Natal, Páscoa e Dia das Crianças, além de campanhas de doação de sangue.</span>
                        </p>
                    </div>
                    </AnimatedSection>
                </div>
            </section>
        </>
    )
}
export default SectionHistoria;