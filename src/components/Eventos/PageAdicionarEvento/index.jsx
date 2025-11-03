import React, { useState } from "react";
import "../../../styles/Eventos/adicionar-evento/style.css";
import Button from "../../Button";
import IconUpload from "../../../assets/Blog/upload.svg";
import { apiPost } from "../../../config/api";
import { useNavigate } from "react-router-dom";

const AdicionarEvento = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [endereco, setEndereco] = useState("");
  const [regiao, setRegiao] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataEvento = new Date(data);
    const horaEvento = hora;

    const eventoData = {
      nome,
      descricao,
      data: `${dataEvento.toISOString().split("T")[0]}T${horaEvento}:00`,
      local: `${estado} - ${cidade}, ${endereco}, ${regiao}`,
      imagem: "default-image.png",
    };

    setLoading(true);

    try {
      const response = await apiPost("/evento/marcar", eventoData);

      if (response.ok) {
        const responseData = await response.json();
        console.log("Evento cadastrado:", responseData);

        setNome("");
        setData("");
        setHora("");
        setEstado("");
        setCidade("");
        setEndereco("");
        setRegiao("");
        setDescricao("");
        setImagem(null);

        setTimeout(() => {
          navigate("/eventos");
        }, 1500);
      } else {
        console.error("Erro ao cadastrar evento");
      }
    } catch (error) {
      console.error("Erro ao cadastrar evento:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-form-evento">
      <h1 className="titulo-form-evento">Novo evento</h1>
      <div className="content-form-evento">
        <form className="form-evento" onSubmit={handleSubmit}>
          <label htmlFor="nome">Nome</label>
          <input
            name="nome"
            type="text"
            placeholder="Nome do evento"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <div className="data-hora">
            <label htmlFor="data">Data</label>
            <input
              name="data"
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
            <label htmlFor="hora">Hora</label>
            <input
              name="hora"
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
            />
          </div>

          <div className="local-estado">
            <label htmlFor="estado">Estado</label>
            <input
              name="estado"
              type="text"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            />

            <label htmlFor="cidade">Cidade</label>
            <input
              name="cidade"
              type="text"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
            />
          </div>

          <label htmlFor="endereco">Endereço</label>
          <input
            name="endereco"
            type="text"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />

          <label htmlFor="regiao">Região</label>
          <input
            name="regiao"
            type="text"
            value={regiao}
            onChange={(e) => setRegiao(e.target.value)}
          />

          <label htmlFor="descricao">Descrição para o evento</label>
          <textarea
            name="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Digite aqui..."
          ></textarea>

          {/* Input para colocar a imagem do evento */}
          <label>Imagem</label>
          <label htmlFor="uploadImage" className="upload-label">
            <img id="iconUpload" src={IconUpload} alt="Upload" />
            <span>Faça o upload da capa ou arraste o arquivo</span>
          </label>

          {/* Botão de salvar */}
          <Button className="button" text={loading ? "Carregando..." : "Salvar"} />
        </form>
      </div>
    </div>
  );
};

export default AdicionarEvento;
