import React from "react";
import "../../../styles/Cards/CardTarefas/style.css"
import Button from "../../Button";
import { FaCalendarAlt } from "react-icons/fa";

const CardTarefa = ({ nome, data }) => {
    return (
        <>
            <div className="card-tarefa">
                <div className="info-tarefa">
                    <h1>{nome}</h1>
                    <p>
                        <FaCalendarAlt />
                        {data}
                    </p>
                </div>
                <Button text={"Dias disponíveis"} />
            </div>
        </>
    )
}

export default CardTarefa;