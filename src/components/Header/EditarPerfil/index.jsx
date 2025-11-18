import "../../../styles/Header/PageEditarPerfil/style.css";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import defaultImg from "../../../assets/default-imgs/default-img.png";
import Button from "../../Button";
import { useEffect, useState } from "react";
import api from "../../../config/api";

export default function EditarPerfil() {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState({
        nome: "",
        email: "",
        senha: ""
    });

    const [voluntario, setVoluntario] = useState(null);
    const [loading, setLoading] = useState(true);

    const userData = JSON.parse(localStorage.getItem("userData"));
    const id = userData?.id;

    useEffect(() => {
        async function carregarDados() {
            try {
                // USUÁRIO
                const userRes = await api.apiGet(`/usuario/${id}`);
                if (userRes.ok) {
                    const data = await userRes.json();
                    setUsuario({
                        nome: data.nome,
                        email: data.email,
                        senha: ""
                    });
                }

                const volRes = await api.apiGet(`/voluntario/usuario/${id}`);
                if (volRes.ok) {
                    const v = await volRes.json();
                    setVoluntario(v);
                } else {
                    setVoluntario(null);
                }
            } catch (e) {
                console.error("Erro ao carregar dados:", e);
            } finally {
                setLoading(false);
            }
        }

        if (id) carregarDados();
    }, [id]);

    if (loading) return <p>Carregando...</p>;

    async function salvarAlteracoes() {
        try {
            await api.apiPut(`/usuario/atualizar/${id}`, {
                nome: usuario.nome,
                email: usuario.email,
                senha: usuario.senha || null
            });

            if (voluntario?.status === "APROVADO") {
                await api.apiPut(`/voluntario/editar/${voluntario.id}`, {
                    cpf: voluntario.cpf,
                    telefone: voluntario.telefone,
                    dataNascimento: voluntario.dataNascimento,
                    endereco: voluntario.endereco,
                    descricao: voluntario.descricao
                });
            }

            alert("Dados atualizados com sucesso!");
        } catch (e) {
            alert("Erro ao salvar alterações.");
            console.error(e);
        }
    }

    return (
        <>
            <Header />

            <div className="editar-perfil-container">
                <div className="editar-perfil-content">
                    <div className="editar-perfil-cabecalho">
                        <div className="fechar-edicao">
                            <h1>Editar Perfil</h1>
                            <i><FaTimes onClick={() => navigate(-1)} /></i>
                        </div>
                    </div>

                    <div className="editar-dados">
                        <img src={defaultImg} alt="Foto do usuário" />
                        <p>Alterar foto de perfil</p>

                        <form className="form-editar-perfil">
                            <div>
                                <label>Nome</label>
                                <input
                                    type="text"
                                    value={usuario.nome}
                                    onChange={e => setUsuario({ ...usuario, nome: e.target.value })}
                                />
                            </div>

                            <div>
                                <label>E-mail</label>
                                <input
                                    type="text"
                                    value={usuario.email}
                                    onChange={e => setUsuario({ ...usuario, email: e.target.value })}
                                />
                            </div>

                            <div>
                                <label>Senha</label>
                                <input
                                    type="password"
                                    placeholder="Digite sua nova senha..."
                                    onChange={e => setUsuario({ ...usuario, senha: e.target.value })}
                                />
                            </div>

                            {/* Apenas para se também for voluntário */}
                            {voluntario?.status === "APROVADO" && (
                                <>
                                    <div>
                                        <label>CPF</label>
                                        <input
                                            type="text"
                                            value={voluntario.cpf}
                                            onChange={e => setVoluntario({ ...voluntario, cpf: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label>Telefone</label>
                                        <input
                                            type="text"
                                            value={voluntario.telefone}
                                            onChange={e => setVoluntario({ ...voluntario, telefone: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label>Data de Nascimento</label>
                                        <input
                                            type="date"
                                            value={voluntario.dataNascimento}
                                            onChange={e => setVoluntario({ ...voluntario, dataNascimento: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label>Endereço</label>
                                        <input
                                            type="text"
                                            value={voluntario.endereco}
                                            onChange={e => setVoluntario({ ...voluntario, endereco: e.target.value })}
                                        />
                                    </div>
                                </>
                            )}
                        </form>
                    </div>

                    <Button
                        className="btn-salvar-edicao"
                        text={"Salvar alterações"}
                        onClick={() => {
                            salvarAlteracoes();
                            navigate(-1);
                        }}
                    />
                </div>
            </div>

            <Footer />
        </>
    );
}
