import "../../styles/TornarVoluntario/SerVoluntario/style.css"
import Button from "../Button";
import Header from "../Header";
import { useState, useEffect } from "react";
import { apiPost, apiGet } from "../../config/api";
import { useNavigate } from "react-router-dom";

const SerVoluntario = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        dataNascimento: "",
        telefone: "",
        endereco: "",
        cpf: "",
        descricao: "",
    });

    const [idUsuario, setIdUsuario] = useState(null);
    const [jaVoluntario, setJaVoluntario] = useState(false);

    useEffect(() => {
        const buscarUsuario = async () => {
            const userData = JSON.parse(localStorage.getItem("userData") || "{}");
            const email = userData.email;
            if (!email) return;

            // Buscar todos os usuários
            const responseUsuarios = await apiGet("/usuario/todos");
            if (!responseUsuarios.ok) return;

            const usuarios = await responseUsuarios.json();
            const usuarioEncontrado = usuarios.find(u => u.email === email);
            if (!usuarioEncontrado) return;

            const userId = usuarioEncontrado.id || usuarioEncontrado.idUsuario;
            setIdUsuario(userId);

            // Verificar se já é voluntário
            const responseVoluntarios = await apiGet("/voluntario/todos");
            if (!responseVoluntarios.ok) return;

            const voluntarios = await responseVoluntarios.json();
            const voluntarioExistente = voluntarios.find(v => v.idUsuario?.id === userId);

            if (voluntarioExistente) setJaVoluntario(true);
        };

        buscarUsuario();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dadosParaEnviar = {
            idUsuario: idUsuario,
            cpf: formData.cpf,
            telefone: formData.telefone,
            dataNascimento: formData.dataNascimento,
            endereco: formData.endereco,
            descricao: formData.descricao,
        };

        try {
            const response = await apiPost("/voluntario/tornar", dadosParaEnviar);
            const data = await response.json();

            if (response.ok) {
                alert("Inscrição como voluntário realizada com sucesso!");
                setFormData({
                    dataNascimento: "",
                    telefone: "",
                    endereco: "",
                    cpf: "",
                    descricao: "",
                });
                navigate(-1);
            } else {
                if (data.mensagem && data.mensagem.toLowerCase().includes("já é um voluntário")) {
                    alert("Você já é um voluntário!");
                } else {
                    alert(data.mensagem || "Não foi possível se inscrever como voluntário.");
                }
            }
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao se inscrever como voluntário. Tente novamente.");
        }
    };

    return (
        <>
            <Header />
            <div className="container-ser-voluntario">
                <div className="content-ser-voluntario">
                    <h1>Inscrição de voluntário</h1>

                    {jaVoluntario ? (
                        <p>Você já é um voluntário!</p>
                    ) : (
                        <form className="form-ser-voluntario" onSubmit={handleSubmit}>
                            <label htmlFor="dataNascimento">Data de Nascimento</label>
                            <input
                                name="dataNascimento"
                                type="date"
                                value={formData.dataNascimento}
                                onChange={handleChange}
                            />

                            <label htmlFor="telefone">Número de telefone</label>
                            <input
                                name="telefone"
                                type="text"
                                value={formData.telefone}
                                onChange={handleChange}
                            />

                            <label htmlFor="endereco">Endereço</label>
                            <input
                                name="endereco"
                                type="text"
                                placeholder="Digite seu endereço"
                                value={formData.endereco}
                                onChange={handleChange}
                            />

                            <label htmlFor="cpf">Seu CPF</label>
                            <input
                                name="cpf"
                                type="text"
                                placeholder="Digite seu CPF..."
                                value={formData.cpf}
                                onChange={handleChange}
                            />

                            <label htmlFor="descricao">Porque quero me voluntariar?</label>
                            <textarea
                                name="descricao"
                                placeholder="Escreva o motivo de querer se voluntariar..."
                                value={formData.descricao}
                                onChange={handleChange}
                            />

                            <Button text={"Enviar"} />
                        </form>
                    )}
                </div>
            </div>
        </>
    );
}

export default SerVoluntario;
