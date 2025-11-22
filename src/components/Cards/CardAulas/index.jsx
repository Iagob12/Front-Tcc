import React from "react";
import { FaCalendarAlt, FaTimes } from "react-icons/fa";
import "../../../styles/Cards/CardAulas/style.css";
import { apiDelete } from "../../../config/api";

const CardAula = ({ idInscricao, img, descricao, data, titulo, onCancel }) => {
    const handleCancelar = async () => {
        if (!window.confirm("Tem certeza que deseja cancelar esta aula?")) return;

        try {
            const response = await apiDelete(`/inscricao/deletar/${idInscricao}`);
            if (!response.ok) {
                console.error("Erro ao cancelar a inscrição:", response.status);
                alert("Não foi possível cancelar a inscrição.");
                return;
            }
            const result = await response.json();
            alert(result.mensagem || "Inscrição cancelada com sucesso!");
            onCancel(idInscricao);
        } catch (error) {
            console.error("Erro ao cancelar inscrição:", error);
            alert("Erro ao cancelar inscrição.");
        }
    };

    return (
        <div className="card-aula">
            <img src={img} alt={titulo} />
            <div className="info-aula">
                <h1>{titulo}</h1>
                <div className="info-aula-opcoes">
                    <p>{descricao}</p>
                    <p>
                        <FaCalendarAlt /> {data}
                    </p>
                    <p
                        style={{ cursor: "pointer", color: "red", fontWeight: "bold" }}
                        onClick={handleCancelar}
                    >
                        <FaTimes /> Cancelar aula
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CardAula;
