import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/PageSistemaAprovacao/style.css";
import Header from "../../components/Header";
import CardBlog from "../../components/Cards/SistemaAprovacaoCards/AprovarBlog";
import CardVoluntario from "../../components/Cards/SistemaAprovacaoCards/AprovarVoluntario";
import { apiGet } from "../../config/api";
import imgbase from "../../assets/teste/img.jpg";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const SistemaAprovacao = () => {
  const [seletor, setSeletor] = useState("");
  const [blogsPendentes, setBlogsPendentes] = useState([]);
  const [voluntariosPendentes, setVoluntariosPendentes] = useState([]);
  // Navigate para acessar a blog details 
  const navigate = useNavigate();

  const fetchBlogsPendentes = async () => {
    try {
      const response = await apiGet("/blog/pendentes");
      if (response.ok) {
        const data = await response.json();
        setBlogsPendentes(data);
      } else {
        console.error("Erro ao buscar blogs pendentes");
      }
    } catch (error) {
      console.error("Erro de rede:", error);
    }
  };

  const fetchVoluntariosPendentes = async () => {
    try {
      const response = await apiGet("/voluntario/listar/pendentes");
      if (response.ok) {
        const data = await response.json();
        setVoluntariosPendentes(data);
      } else {
        console.error("Erro ao buscar voluntários pendentes");
      }
    } catch (error) {
      console.error("Erro de rede:", error);
    }
  };

  useEffect(() => {
    if (seletor === "BLOGS") {
      fetchBlogsPendentes();
    } else if (seletor === "VOLUNTARIOS") {
      fetchVoluntariosPendentes();
    }
  }, [seletor]);

  return (
    <>
      <Header />
      <div className="container-sistema-aprovacao">
        <section className="dashboard-sistema">
          <div className="cabecalho-sistema-aprovacao">
            <h1>Sistema de Aprovação</h1>
            <select value={seletor} onChange={(e) => setSeletor(e.target.value)}>
              <option value="" disabled hidden>
                Selecione uma opção
              </option>
              <option value="BLOGS">Blog</option>
              <option value="VOLUNTARIOS">Voluntários</option>
            </select>
          </div>

          <section className="lista-aprovar">
            {/* Blogs Pendentes */}
            {seletor === "BLOGS" && (
              <>
                {blogsPendentes.length > 0 ? (
                  blogsPendentes.map((blog, index) => (
                    <div
                      key={index}
                      onClick={() =>
                        navigate(`/sistema-aprovacao/detalhes-blog/${blog.id}`, {
                          state: { showButtons: true },
                        })
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <CardBlog
                        key={index}
                        img={blog.urlNoticia}
                        nomeUsuario={blog.idUsuario.nome}
                        titulo={blog.tituloMateria}
                        conteudo={blog.informacao}
                        data={formatDate(blog.dataPostagem)}
                        onClick={() => navigate(`/blog/${blog.id}`, { state: { showButtons: true } })}
                      />
                    </div>
                  ))
                ) : (
                  <p className="sem-solicitacoes">
                    Não há blogs pendentes no momento!
                  </p>
                )}
              </>
            )}

            {/* Voluntários Pendentes */}
            {seletor === "VOLUNTARIOS" && (
              <>
                {voluntariosPendentes.length > 0 ? (
                  voluntariosPendentes.map((voluntario, index) => (
                    <CardVoluntario
                      key={index}
                      fotoPerfil={imgbase}
                      descricao={voluntario.descricao}
                      nomeVoluntario={voluntario.idUsuario.nome}
                    />
                  ))
                ) : (
                  <p className="sem-solicitacoes">
                    Não há solicitações de voluntários no momento!
                  </p>
                )}
              </>
            )}
          </section>
        </section>
      </div>
    </>
  );
};

export default SistemaAprovacao;
