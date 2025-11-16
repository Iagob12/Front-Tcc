import "../../../styles/PageSistemaAprovacao/VoluntarioDetails/style.css";
import { FaTimes } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiGet, apiPut, apiDelete } from "../../../config/api";

const VoluntarioDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [voluntario, setVoluntario] = useState(null);

    const fetchVoluntario = async () => {
        try {
            const response = await apiGet(`/voluntario/${id}`);
            if (response.ok) {
                const data = await response.json();
                setVoluntario(data);
            } else {
                alert("Erro ao buscar voluntário!");
            }
        } catch (error) {
            console.error("Erro ao carregar voluntário:", error);
        }
    };

    useEffect(() => {
        fetchVoluntario();
    }, [id]);

    const handleAprovar = async () => {
        try {
            const response = await apiPut(`/voluntario/aprovar/${id}`);
            if (response.ok) {
                alert("Voluntário aprovado com sucesso!");
                navigate(-1);
            } else {
                alert("Erro ao aprovar voluntário!");
            }
        } catch (error) {
            console.error(error);
            alert("Erro na requisição!");
        }
    };

    const handleNegar = async () => {
        try {
            const response = await apiDelete(`/voluntario/cancelar/${id}`);
            if (response.ok) {
                alert("Solicitação cancelada!");
                navigate(-1);
            } else {
                alert("Erro ao cancelar voluntário!");
            }
        } catch (error) {
            console.error(error);
            alert("Erro na requisição!");
        }
    };

    if (!voluntario) return <p>Carregando...</p>;

    return (
        <div className="container-detalhes-voluntario">
            <div className="cabecalho-detalhes-voluntario">
                <h2>Detalhes do Voluntário</h2>
                <FaTimes className="icon-fechar" onClick={() => navigate(-1)} />
            </div>

            <section className="detalhes-voluntario">
                <div className="field-detalhes-voluntario">
                    <p className="field-name">Nome completo</p>
                    <p className="field-detalhe">{voluntario.idUsuario.nome}</p>
                </div>

                <div className="field-detalhes-voluntario">
                    <p className="field-name">Email</p>
                    <p className="field-detalhe">{voluntario.idUsuario.email}</p>
                </div>

                <div className="field-detalhes-voluntario">
                    <p className="field-name">Data de Nascimento</p>
                    <p className="field-detalhe">
                        {voluntario.dataNascimento.split("-").reverse().join("/")}
                    </p>
                </div>

                <div className="field-detalhes-voluntario">
                    <p className="field-name">Número de Telefone</p>
                    <p className="field-detalhe">{voluntario.telefone}</p>
                </div>

                <div className="field-detalhes-voluntario">
                    <p className="field-name">Por que quero me voluntariar</p>
                    <p className="field-detalhe">{voluntario.descricao}</p>
                </div>

                <div className="opcoes-aprovar">
                    <button onClick={handleAprovar}>Aprovar</button>
                    <button onClick={handleNegar}>Negar</button>
                </div>
            </section>
        </div>
    );
};

export default VoluntarioDetails;
