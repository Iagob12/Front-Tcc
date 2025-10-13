import React from "react";
import "../../../styles/SobreNos/section-pilares/style.css"
import Pilar from "../../Cards/Cards-SobreNos/Pilar" 

// Img pilares
import missao_img from "../../../assets/SobreNos/missao.png"
import valores_img from "../../../assets/SobreNos/valores.png"
import visao_img from "../../../assets/SobreNos/visao.png"

const SectionPilares = ({ id }) => {
  return (
    <>
    <section id={id} className="section-pilares">
                <Pilar titulo={"Missão"} 
                img={missao_img}  
                descricao={"Promover inclusão social e dignidade por meio da solidariedade, cultura e cidadania, oferecendo oportunidades a crianças, jovens e famílias em situação de vulnerabilidade."} />

                <Pilar titulo={"Visão"} 
                img={visao_img}  
                descricao={"Ser referência em ações voluntárias e projetos comunitários que inspiram transformação social, construindo uma sociedade mais justa, unida e comprometida com o bem comum."} />

                <Pilar titulo={"Valores"} 
                img={valores_img}  
                descricao={"Solidariedade, Respeito, Gratuidade, Compromisso, Transparência, Cultura e educação"} />
            </section>
                <hr />
        </>
    )
}

export default SectionPilares