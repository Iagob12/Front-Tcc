import React, { useEffect, useState } from "react";
import Title from "../../Title";
import CardEventos from "../../Cards/CardEventos";
import "../../../styles/Eventos/section-eventos/style.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { apiGet, apiDelete, getImageUrl } from "../../../config/api";
import { useToast } from '../../Toast/useToast';
import ToastContainer from '../../Toast/ToastContainer';
import { FaTrash } from 'react-icons/fa';
import imgdefault from "../../../assets/teste/imgdefaultevent.png";

export default function SectionEventos() {
  const { isAdmin } = useAuth();
  const toast = useToast();

  const [eventos, setEventos] = useState([]);
  const [deletingEventoId, setDeletingEventoId] = useState(null);

  const fetchEventos = async () => {
    const response = await apiGet("/evento/listar");
    if (response.ok) {
      const data = await response.json();
      setEventos(data);
    }
  };

  const handleDeleteEvento = async (eventoId, e) => {
    e.stopPropagation();
    
    if (!window.confirm("Tem certeza que deseja excluir este evento? Esta ação não pode ser desfeita.")) {
      return;
    }

    setDeletingEventoId(eventoId);
    try {
      const response = await apiDelete(`/evento/deletar/${eventoId}`);
      if (response.ok) {
        toast.success("Evento excluído com sucesso!");
        fetchEventos();
      } else {
        const error = await response.json();
        toast.error(error.message || "Erro ao excluir o evento.");
      }
    } catch (error) {
      console.error("Erro ao excluir evento:", error);
      toast.error("Erro ao excluir o evento.");
    } finally {
      setDeletingEventoId(null);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  return (
    <>
      <ToastContainer toasts={toast.toasts} removeToast={toast.removeToast} />
      <section className="section-eventos">
        <Title title={"Eventos"} />
        {eventos.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '20px', color: 'var(--color-grey)', fontSize: '1rem' }}>
            Não há eventos para exibir.
          </p>
        ) : (
          eventos.map((evento) => (
            <div key={evento.id} className="evento-card-container" style={{ position: 'relative', display: 'inline-block' }}>
              <CardEventos
                titulo={evento.nome}
                img={evento.imagem ? getImageUrl(evento.imagem) : imgdefault}
                local={evento.local}
                data={evento.data}
              />
              {isAdmin && (
                <button
                  className="btn-delete-evento"
                  onClick={(e) => handleDeleteEvento(evento.id, e)}
                  disabled={deletingEventoId === evento.id}
                  title={deletingEventoId === evento.id ? "Excluindo..." : "Excluir evento"}
                >
                  <FaTrash />
                </button>
              )}
            </div>
          ))
        )}
        {isAdmin && (
          <Link to="/adicionar-evento" className="link-adicionar">
            + Adicionar evento
          </Link>
        )}
      </section>
    </>
  );
}
