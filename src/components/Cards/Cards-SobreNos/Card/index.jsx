import React from "react";
import "../../../../styles/Cards/Card-SobreNos/Card-tempo/style.css";
import AnimatedSection from "../../../AnimatedSection";

const Card = ({ ano, img, acontecimento, texto, invertido }) => {
    return (
        <AnimatedSection delay={0.4}>
            <div className="card-sobre-nos">
                <div className="ano">
                    <p>{ano}</p>
                </div>
                <div className="info-card">
                    {invertido ? (
                        <>
                            <div className="titulo-acontecimento">
                                <h3>{acontecimento}</h3>
                                <p>{texto}</p>
                            </div>
                            <div className="linha-card"></div>
                            <div>
                                <img src={img} />
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <img src={img} />
                            </div>
                            <div className="linha-card"></div>
                            <div className="titulo-acontecimento">
                                <h3>{acontecimento}</h3>
                                <p>{texto}</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </AnimatedSection>
    );
};

export default Card;
