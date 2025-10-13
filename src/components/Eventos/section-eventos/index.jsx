import React from "react";
import Title from "../../Title"
import CardEventos  from "../../Cards/CardEventos";
import "../../../styles/Eventos/section-eventos/style.css";
import natal from "../../../assets/Eventos/evento-natal.svg";
import pascoa from "../../../assets/Eventos/evento-pascoa.png";
import arrecadacao from "../../../assets/Eventos/evento-arrecadacao.svg";


export default function SectionEventos(){
    return (
        <>
        <section className="section-eventos">
            <Title title={"Eventos"} />
            <CardEventos img={natal} titulo={"Evento de Natal"} local={"São Mateus, Zona Leste, SP"} data={"20/12/2025"} />
            <CardEventos img={pascoa} titulo={"Evento de Páscoa"} local={"São Mateus, Zona Leste, SP"} data={"10/02/2025"} />
            <CardEventos img={arrecadacao} titulo={"Evento de Arrecadação"} local={"São Mateus, Zona Leste, SP"} data={"19/08/2025"} />
        </section>
        </>
    )
}