import React from "react";
import CardAula from "../../Cards/CardAulas";
import teste from "../../../assets/Tarefas/section-agenda/ballet.png"
import "../../../styles/Tarefa/section-aulas/style.css"

export default function SectionAulas() {
    return (
        <>
            <section className="lista-aulas">
                <CardAula img={teste} local={"São Mateus, Zona Leste, SP"} data={"Segunda e Terça"} />
                <CardAula img={teste} local={"São Mateus, Zona Leste, SP"} data={"Segunda e Terça"} />
            </section>
        </>
    )
}