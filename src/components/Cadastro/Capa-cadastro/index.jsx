import React from "react";
import { Link } from "react-router-dom";
import "../../../styles/Cadastro/Capa/style.css"
import logo from "../../../assets/Logos/Logo.svg"

const CapaCadastro = ({title, img}) => {
    return (
        <>
        <main className="cadastro">
              <div className="capa-container">
                <img src={img} className="fundo" />
                <div className="overlay"></div>
                <Link to="/" className="cabecalho">
                    <img src={logo} alt="logo" />
                    <p>Fazer o Bem <br /> Faz Muito Bem</p>
                </Link>
                <h1>{title}</h1>
            </div>
        </main>
          
        </>
    )
}

export default CapaCadastro
