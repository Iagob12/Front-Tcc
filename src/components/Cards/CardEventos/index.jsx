import React from "react";
import "../../../styles/Cards/CardEventos/style.css"
import Button from "../../Button"

import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const CardEventos = ({img, titulo, local, data}) => {
    return (
        <>
        <div className="cardEventos-container">
            <img src={img} />
            <div className="cardEventos-info">
                <h2>{titulo}</h2>
                    <div className="dados-evento">
                        <p>
                            <FaMapMarkerAlt className="endereco" style={{ marginRight: "8px" }} />{local}</p>
                        <p> 
                            <FaCalendarAlt className="data" style={{ marginRight: "8px" }} />
                            {data}</p>
                            <Button text={"Saiba mais"} primary={true}/>
                    </div>
                    
                
            </div>
            
        </div>
        </>
    )
}

export default CardEventos;