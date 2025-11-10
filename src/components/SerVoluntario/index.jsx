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

    useEffect(() => {
        const buscarUsuario = async () => {
            try {
                const userData = JSON.parse(localStorage.getItem("userData") || "{}");
                const email = userData.email;

                if (!email) {
                    console.error("Email não encontrado no userData");
                    return;
                }

                const response = await apiGet("/usuario/todos");
                
                if (response.ok) {
                    const usuarios = await response.json();
                    const usuarioEncontrado = usuarios.find(u => u.email === email);
                    
                    if (usuarioEncontrado) {
                        console.log("Usuário completo encontrado:", usuarioEncontrado);
                        setIdUsuario(usuarioEncontrado.id || usuarioEncontrado.idUsuario);
                    } else {
                        console.error("Usuário não encontrado na lista");
                    }
                } else {
                    console.error("Erro ao buscar lista de usuários");
                }
            } catch (error) {
                console.error("Erro ao buscar dados do usuário:", error);
            }
        };

        buscarUsuario();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepara os dados para o backend
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

                        <Button text={"Enviar"}/>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SerVoluntario;
