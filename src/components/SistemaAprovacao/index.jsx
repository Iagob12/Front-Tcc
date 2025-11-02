import { useState, useEffect } from "react";
import "../../styles/PageSistemaAprovacao/style.css";
import Header from "../../components/Header";
import CardBlog from "../../components/Cards/SistemaAprovacaoCards/AprovarBlog";
import { apiGet } from "../../config/api";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("pt-BR", options);
};

const SistemaAprovacao = () => {
  const [seletor, setSeletor] = useState("");
  const [blogsPendentes, setBlogsPendentes] = useState([]);

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

  useEffect(() => {
    if (seletor === "BLOGS") {
      fetchBlogsPendentes();
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
                    <CardBlog
                      key={index}
                      img={blog.urlNoticia}
                      nomeUsuario={blog.idUsuario.nome}
                      titulo={blog.tituloMateria}
                      conteudo={blog.informacao}
                      data={formatDate(blog.dataPostagem)}
                    />
                  ))
                ) : (
                  <p className="sem-solicitacoes">
                    Não há blogs pendentes no momento!
                  </p>
                )}
              </>
            )}

            {/* Voluntários */}
            {seletor === "VOLUNTARIOS" && (
              <p className="sem-solicitacoes">Não há solicitações de voluntários no momento!</p>
            )}
          </section>
        </section>
      </div>
    </>
  );
};

export default SistemaAprovacao;
