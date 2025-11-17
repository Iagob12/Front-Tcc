import "../../../styles/Home/AdicionarAtividade/style.css";
import Button from "../../Button";
import IconUpload from "../../../assets/Blog/upload.svg";
import { useState } from "react";
import { apiPost } from "../../../config/api";
import { useNavigate } from "react-router-dom";

const AdicionarAtividade = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nome: "",
        descricao: "",
        data: "",
        hora: "",
        vagas: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dto = {
            titulo: formData.nome,
            descricao: formData.descricao,
            dias: formData.data,
            horario: formData.hora,
            vagas: Number(formData.vagas),
        };

        try {
            const response = await apiPost("/curso/cadastrar", dto);
            if (response.ok) {
                alert("Atividade cadastrada com sucesso!");
                setFormData({
                    nome: "",
                    descricao: "",
                    data: "",
                    hora: "",
                    vagas: 0,
                });
                navigate(-1); // Volta uma página
            } else {
                alert("Erro ao cadastrar atividade. Tente novamente.");
                console.error("Erro ao cadastrar atividade", response.status);
            }
        } catch (error) {
            alert("Erro ao conectar com a API. Tente novamente.");
            console.error("Erro ao conectar com a API", error);
        }
    };

    return (
        <div className="container-form-atividade">
            <h1 className="titulo-form-atividade">Nova atividade</h1>
            <div className="content-form-atividade">
                <form className="form-atividade" onSubmit={handleSubmit}>

                    <label htmlFor="nome">Nome</label>
                    <input
                        name="nome"
                        type="text"
                        placeholder="Nome da atividade"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="descricao">Descrição</label>
                    <input
                        name="descricao"
                        type="text"
                        placeholder="Descrição da atividade"
                        value={formData.descricao}
                        onChange={handleChange}
                        required
                    />

                    <div className="data-hora">
                        <label htmlFor="data">Data e hora</label>
                        <input
                            name="data"
                            type="text"
                            placeholder="Segunda a Sexta"
                            value={formData.data}
                            onChange={handleChange}
                            required
                        />
                        <input
                            name="hora"
                            type="time"
                            value={formData.hora}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <label htmlFor="vagas">Número de vagas</label>
                    <input
                        name="vagas"
                        type="number"
                        value={formData.vagas}
                        onChange={handleChange}
                        min={0}
                        required
                    />

                    <label>Imagem</label>
                    <label htmlFor="uploadImage" className="upload-label">
                        <img id="iconUpload" src={IconUpload} alt="Upload" />
                        <span>Faça o upload da capa ou arraste o arquivo</span>
                    </label>

                    <Button className="button" text={"Salvar"} />
                </form>
            </div>
        </div>
    );
};

export default AdicionarAtividade;
