import React from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaBell, FaTimes } from "react-icons/fa";
import "../../../styles/Cards/CardAulas/style.css"
const CardAula = ({img, local, data}) =>{
    return (
        <>
            <div className="card-aula">
                <img src={img} />
                <div className="info-aula">
                    <div className="local-data">
                        <p>
                            <FaMapMarkerAlt />
                            {local}
                        </p>
                        <p>
                            <FaCalendarAlt />
                            {data}
                        </p>
                    </div>
                    <div className="lembrete-cancelar">
                        <p>
                            <FaBell />
                            Adicionar lembrete
                        </p>
                        <p>
                            <FaTimes />
                            Cancelar aula
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardAula;