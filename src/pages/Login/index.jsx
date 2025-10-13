import React from "react";
import CapaCadastro from "../../components/Cadastro/Capa-cadastro"
import CardCadastro from "../../components/Cards/CardCadastro";
import capa from "../../assets/Login/capa-login.png"

export default function Login(){
    return(
        <>
        <div className="formulario-container">
            <CapaCadastro title={"Você faz parte desse movimento"} img={capa}/>
            <CardCadastro title={"Login"} action={"Login"}/>
        </div>
        </>
    )
}