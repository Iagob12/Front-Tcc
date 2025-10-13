import React from "react";
import CardTarefa from "../../Cards/CardTarefa"
import "../../../styles/Tarefa/section-tarefas/style.css"

const ListaTarefa = ({ emAgenda = false }) => {
    return(
        <>
            <section className={`lista-tarefas ${emAgenda ? 'em-agenda' : ''}`}>
                <CardTarefa nome={"Limpeza da sede"} data={"Segunda à Sexta"} emAgenda={emAgenda}/>
                <CardTarefa nome={"Zeladoria na praça"} data={"Sábado"} emAgenda={emAgenda}/>
                <CardTarefa nome={"Ajuda em evento"} data={"23/09/2025"} emAgenda={emAgenda}/>
            </section>
        </>
    )
}

export default ListaTarefa;