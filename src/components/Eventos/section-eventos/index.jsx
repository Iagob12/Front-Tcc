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

  // Função para buscar os eventos
  const fetchEventos = async () => {
    const response = await apiGet("/evento/listar")
    if (response.ok) {
      const data = await response.json();
      setEventos(data);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  return (
    <section className="section-eventos">
      <Title title={"Eventos"} />
      {eventos.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '20px', color: 'var(--color-grey)', fontSize: '1rem' }}>
          Não há eventos para exibir.
        </p>
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
      {isAdmin && (
        <Link to="/adicionar-evento" className="link-adicionar">
          + Adicionar evento
        </Link>
      )}
    </section>
  );
}
