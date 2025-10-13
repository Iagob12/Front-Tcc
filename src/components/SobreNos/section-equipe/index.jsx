import React from "react";
import Title from "../../Title";
import presidente from "../../../assets/SobreNos/presidente.png"
import "../../../styles/SobreNos/section-equipe/style.css"
import AnimatedSection from "../../AnimatedSection";

export default function SectionEquipe({ id }) {
    return (
        <>
            <section id={id} className="section-equipe">
                <Title title={"Equipe"} />

                <AnimatedSection delay={0.4}>
                    <section className="container-equipe">
                        <div>
                            <p>Marco Aurélio de Freitas Silvestre é o criador e Presidente da ONG, junto com sua esposa Luciane Dabrins vice-presidente</p>
                        </div>
                        <img src={presidente} alt="Presidente da ONG" />
                    </section>
                </AnimatedSection>
            </section>
        </>
    )
};