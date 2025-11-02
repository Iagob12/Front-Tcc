import { useState } from "react";
import "../../styles/PageSistemaAprovacao/style.css";
import Header from "../../components/Header";
import CardBlog from "../../components/Cards/SistemaAprovacaoCards/AprovarBlog";
import CardVoluntario from "../Cards/SistemaAprovacaoCards/AprovarVoluntario";
import img from "../../assets/teste/colgate.png";
import foto from "../../assets/teste/img.jpg";

const SistemaAprovacao = () => {
  const [seletor, setSeletor] = useState("");

  // Arrays de exemplo (você pode buscar do backend depois)
  const blogs = [
    {
      img: img,
      nomeUsuario: "Usuario",
      titulo: "Um titulo qualquer",
      conteudo:
        "Lorem ipsum dolor sit amet consectetur. Scelerisque sed et interdum auctor. Pellentesque egestas nunc sed feugiat sed tincidunt.",
      data: "14 de agosto de 2024",
    },
    {
      img: img,
      nomeUsuario: "Usuario 2",
      titulo: "Outro titulo",
      conteudo:
        "Lorem ipsum dolor sit amet consectetur. Scelerisque sed et interdum auctor. Pellentesque egestas nunc sed feugiat sed tincidunt.",
      data: "15 de agosto de 2024",
    },
  ];

  const voluntarios = [
    {
      fotoPerfil: foto,
      nomeVoluntario: "Voluntario",
      descricao:
        "Lorem ipsum dolor sit amet consectetur. Nunc morbi molestie id tortor volutpat mauris habitasse...",
    },
    {
      fotoPerfil: foto,
      nomeVoluntario: "Voluntario",
      descricao:
        "Lorem ipsum dolor sit amet consectetur. Nunc morbi molestie id tortor volutpat mauris habitasse...",
    },
  ];

  return (
    <>
      <Header />
      <div className="container-sistema-aprovacao">
        <section className="dashboard-sistema">
          <div className="cabecalho-sistema-aprovacao">
            <h1>Sistema de Aprovação</h1>
            <select
              value={seletor}
              onChange={(e) => setSeletor(e.target.value)}
            >
              <option value="" disabled hidden>
                Selecione uma opção
              </option>
              <option value="BLOGS">Blog</option>
              <option value="VOLUNTARIOS">Voluntários</option>
            </select>
          </div>

          <section className="lista-aprovar">
            {/* Blogs */}
            {seletor === "BLOGS" && (
              <>
                {blogs.length > 0 ? (
                  blogs.map((blog, index) => (
                    <CardBlog
                      key={index}
                      img={blog.img}
                      nomeUsuario={blog.nomeUsuario}
                      titulo={blog.titulo}
                      conteudo={blog.conteudo}
                      data={blog.data}
                    />
                  ))
                ) : (
                  <p className="sem-solicitacoes">
                    Não há solicitações no momento!
                  </p>
                )}
              </>
            )}

            {/* Voluntários */}
            {seletor === "VOLUNTARIOS" && (
              <>
                {voluntarios.length > 0 ? (
                  <>
                    {voluntarios.map((v, index) => (
                      <CardVoluntario
                        key={index}
                        fotoPerfil={v.fotoPerfil}
                        nomeVoluntario={v.nomeVoluntario}
                        descricao={v.descricao}
                      />
                    ))}
                  </>
                ) : (
                  <p className="sem-solicitacoes">
                    Não há solicitações no momento!
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
