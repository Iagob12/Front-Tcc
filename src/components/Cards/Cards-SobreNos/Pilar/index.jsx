import React from "react";
import "../../../../styles/Cards/Card-SobreNos/Card-pilar/style.css"

const Pilar = ({img, titulo, descricao}) => {
    return (
        <>
            <div className="card-pilar">
                <img src={img} />
                <h1>{titulo}</h1>
                <p>{descricao}</p>
            </div>
        </>
    )
};

export default Pilar;