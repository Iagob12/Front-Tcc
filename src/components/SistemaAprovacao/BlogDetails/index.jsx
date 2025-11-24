import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "../../../styles/PageSistemaAprovacao/BlogDetails/style.css";
import { FaCalendarAlt, FaClock, FaTimes, FaPaperPlane } from "react-icons/fa";
import { apiGet, apiPut, apiDelete, apiPost } from "../../../config/api";
import CardComentario from "../../Cards/CardComentario";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);

  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState("");

  const usuarioLogado = JSON.parse(localStorage.getItem("userData"));

  const showButtons = location.state?.showButtons;

  useEffect(() => {
    fetchBlog();
    fetchComentarios();
  }, [id]);

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

  const fetchComentarios = async () => {
    try {
      const response = await apiGet(`/comentario/blog/${id}`);
      if (response.ok) {
        const data = await response.json();
        setComentarios(data);
      }
    } catch (error) {
      console.error("Erro ao carregar comentários:", error);
    }
  };

  const handleEnviarComentario = async () => {
    if (!novoComentario.trim()) return;

    const comentarioDTO = {
      idBlog: Number(id),
      idUsuario: usuarioLogado?.id,
      comentario: novoComentario,
    };

    try {
      const response = await apiPost("/comentario/postar", comentarioDTO);
      if (response.ok) {
        setNovoComentario("");
        fetchComentarios();
      }
    } catch (error) {
      console.error("Erro ao comentar:", error);
    }
  };

  const handleAprovar = async () => {
    setLoading(true);
    try {
      const response = await apiPut(`/blog/aprovar/${id}`);
      if (response.ok) navigate(-1);
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
      if (response.ok) navigate(-1);
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

        {/* Opções para aprovação */}
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

        {/* Comentarios */}
        {!showButtons && (
          <div className="section-comentarios">

            <div className="area-comentar">
              <input
                type="text"
                placeholder="Comente sobre o blog..."
                value={novoComentario}
                onChange={(e) => setNovoComentario(e.target.value)}
              />
              <button className="send-comentario" onClick={handleEnviarComentario}>
                <FaPaperPlane />
              </button>
            </div>

            <section className="lista-comentarios">
              {comentarios.length > 0 ? (
                comentarios.map((c) => (
                  <CardComentario
                    key={c.id}
                    nomeUsuario={c.nomeUsuario}
                    comentario={c.comentario}
                  />
                ))
              ) : (
                <p className="sem-comentarios-p">Sem comentários ainda. Seja o primeiro a fazer um comentário!</p>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
