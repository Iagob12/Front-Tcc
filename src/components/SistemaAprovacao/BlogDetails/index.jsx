import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "../../../styles/PageSistemaAprovacao/BlogDetails/style.css";
import { FaCalendarAlt, FaClock, FaTimes } from "react-icons/fa";
import { apiGet, apiPut, apiDelete } from "../../../config/api";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);

  // Serve para mostrar os botões de aprovar quando estiver no Sistema de aprovação
  const showButtons = location.state?.showButtons;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await apiGet(`/blog/buscar/${id}`);
        if (response.ok) {
          const data = await response.json();
          setBlog(data);
        }
      } catch (error) {
        console.error("Erro ao carregar detalhes do blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

  const handleAprovar = async () => {
    setLoading(true);
    try {
      const response = await apiPut(`/blog/aprovar/${id}`);
      if (response.ok) {
        console.log("Blog aprovado com sucesso!");
        navigate(-1);
      } else {
        console.log("Erro ao aprovar o blog.");
      }
    } catch (error) {
      console.error("Erro ao aprovar blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNegar = async () => {
    setLoading(true);
    try {
      const response = await apiDelete(`/blog/negar/${id}`);
      if (response.ok) {
        console.log("Blog negado e removido com sucesso!");
        navigate(-1);
      } else {
        console.log("Erro ao negar o blog.");
      }
    } catch (error) {
      console.error("Erro ao negar blog:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!blog) return <p className="loading">Carregando detalhes...</p>;

  return (
    <div className="container-detalhes-blog">
      <h1>{blog.tituloMateria}</h1>
      <div className="detalhes-blog-cabecalho">
        <div className="detalhe-item">
          <FaCalendarAlt className="icon-item" />
          <p>{new Date(blog.dataPostagem).toLocaleDateString("pt-BR")}</p>
        </div>
        <p>|</p>
        <div className="detalhe-item">
          <FaClock className="icon-item" />
          <p>{new Date(blog.dataPostagem).toLocaleTimeString("pt-BR")}</p>
        </div>
        <div className="fechar-detalhes" onClick={() => navigate(-1)}>
          <FaTimes />
        </div>
      </div>

      <div className="content-detalhes-blog">
        <img src={blog.urlNoticia} alt="Capa do blog" />
        <p>{blog.informacao}</p>

        {/* Só mostra se showButton estiver ativo */}
        {showButtons && (
          <div className="opcoes-aprovar">
            <button onClick={handleAprovar} disabled={loading}>
              {loading ? "Aprovando..." : "Aceitar"}
            </button>
            <button onClick={handleNegar} disabled={loading}>
              {loading ? "Negando..." : "Rejeitar"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
