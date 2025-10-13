import React from "react";
import CapaCadastro from "../../components/Cadastro/Capa-cadastro"
import capa from "../../assets/Cadastro/capa-cadastro.png"
import CardCadastro from "../../components/Cards/CardCadastro";
import "../../styles/Cadastro/style.css"

export default function Cadastro(){
    return(
        <>
        <div className="formulario-container">
            <CapaCadastro title={"Quem ajuda transforma vidas"} img={capa}/>
            <CardCadastro title={"Cadastrar-se"} action={"Cadastrar-se"}/>
        </div>
        </>
    )
}