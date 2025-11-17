import React from "react";
import "../../../styles/Cards/CardEventos/style.css"
import Button from "../../Button"

import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const CardEventos = ({img, titulo, local, data}) => {
    // Garantir que a imagem seja renderizada corretamente
    const imageSrc = img || null;
    
    return (
        <>
        <div className="cardEventos-container">
            {imageSrc ? (
                <img src={imageSrc} alt={titulo || "Evento"} />
            ) : (
                <div style={{ 
                    width: '400px', 
                    minHeight: '300px', 
                    backgroundColor: '#f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '20px 0 0 20px'
                }}>
                    <span style={{ color: '#999' }}>Sem imagem</span>
                </div>
            )}
            <div className="cardEventos-info">
                <h2>{titulo}</h2>
                    <div className="dados-evento">
                        <p>
                            <FaMapMarkerAlt className="endereco" style={{ marginRight: "8px" }} />{local}</p>
                        <p> 
                            <FaCalendarAlt className="data" style={{ marginRight: "8px" }} />
                            {data}</p>
                            <Button className="btn" text={"Saiba mais"} primary={true}/>
                    </div>
            </div>
        </div>
        </>
    )
}

export default CardEventos;