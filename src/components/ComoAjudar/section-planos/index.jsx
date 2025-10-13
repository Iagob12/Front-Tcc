import React from "react";
import "../../../styles/ComoAjudar/section-planos/style.css"
import Button from "../../../components/Button"
import AnimatedSection from "../../AnimatedSection";
import { Link } from "react-router-dom";

export default function SectionPlanos() {
    return (
        <>
        <AnimatedSection delay={0.4}>
            <section className="section-planos">
                <h2>Fazer o Bem Faz Muito Bem</h2>
            
               
                <div className="planos-container">
                    <div className="planos-content">
                        <h3>Seja um voluntário e nos ajude em nossas atividades!</h3>
                        <Link to="/quero-ser-voluntario">
                            <Button text={"Quero ser um voluntário"} />
                        </Link>
                        
                    </div>
                    <div className="cards-doacao">
                        <div className="mensal">
                            <p>Mensal</p>
                            <h4>Escolha um valor <br /> fixo para doar<br /> mensalmente</h4>
                            <Button text={"Continue"} />
                        </div>
                    <div className="doe-agora">
                        <p>Doe agora</p>
                        <h5>Faça sua doação agora mesmo</h5>
                        <button>Continue</button>
                    </div>
                    
                </div>
                
                    
                
            </div>
            </section>
            </AnimatedSection>
        </>
    )
}