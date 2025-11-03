import React, { useEffect, useState } from "react";
import Title from "../../Title";
import CardEventos from "../../Cards/CardEventos";
import "../../../styles/Eventos/section-eventos/style.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { apiGet } from "../../../config/api";
import imgdefault from "../../../assets/teste/imgdefaultevent.png"

export default function SectionEventos() {
  const { isAdmin } = useAuth();

  // Estado para armazenar os eventos
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar os eventos
  const fetchEventos = async () => {
    try {
      const response = await apiGet("/evento/listar")
      if (response.ok) {
        const data = await response.json();
        setEventos(data);
      } else {
        setError("Erro ao carregar eventos.");
      }
    } catch (error) {
      setError("Erro ao conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  if (loading) {
    return <p>Carregando eventos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="section-eventos">
      <Title title={"Eventos"} />
      {eventos.length === 0 ? (
        <p>Não há eventos para exibir.</p>
      ) : (
        eventos.map((evento) => (
          <CardEventos
            key={evento.id}
            titulo={evento.nome}
            img={imgdefault}
            local={evento.local}
            data={evento.data}
          />
        ))
      )}

      {/* Link para adicionar evento, visível apenas para ADMIN */}
      {isAdmin && (
        <Link to="/adicionar-evento" id="btn-evento" className="link-adicionar">
          + Adicionar evento
        </Link>
      )}
    </section>
  );
}
