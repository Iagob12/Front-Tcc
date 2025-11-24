import React from "react";
import "../../../styles/Cards/CardComentario/style.css"
import imgDefault from "../../../assets/default-imgs/default-img.png"

const CardComentario = ({ fotoPerfil, nomeUsuario, comentario }) => {
    return (
        <>
            <div className="comentario-container">
                <div className="cabecalho-comentario">
                    <img src={imgDefault} alt="Foto de perfil de " />
                    <p>{nomeUsuario}</p>
                </div>
                <p>
                    {comentario}
                </p>
            </div>
        </>
    )
}

export default CardComentario;