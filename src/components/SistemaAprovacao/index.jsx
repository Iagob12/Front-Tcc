import "../../styles/PageSistemaAprovacao/style.css"
import Header from "../../components/Header"
import CardBlog from "../../components/Cards/SistemaAprovacaoCards/AprovarBlog"
import img from "../../assets/teste/colgate.png"

const SistemaAprovacao = () => {
    return (
        <>
            <Header />
            <div className="container-sistema-aprovacao">
                <div className="dashboard-sistema">
                    <div className="cabecalho-sistema-aprovacao">
                        <h1>Sistema de Aprovação</h1>
                        { /*Filtro para blogs ou voluntários para aprovação */}
                        <select defaultValue="">
                            <option value="" disabled hidden>Selecione uma opção</option>
                            <option value="BLOG">Blog</option>
                            <option value="VOLUNTARIOS">Voluntários</option>
                        </select>
                    </div>
                    {/*Lista onde aparecerá blogs ou voluntários para avaliação */}
                    <section className="lista-aprovar">
                        <CardBlog
                            img={img}
                            nomeUsuario={"Usuario"}
                            titulo={"Um titulo qualquer"}
                            conteudo={"Lorem ipsum dolor sit amet consectetur. Scelerisque sed et interdum auctor. Pellentesque egestas nunc sed feugiat sed tincidunt. "}
                            data={"14 de agosto de 2024"}
                        />
                        <CardBlog
                            img={img}
                            nomeUsuario={"Usuario"}
                            titulo={"Um titulo qualquer"}
                            conteudo={"Lorem ipsum dolor sit amet consectetur. Scelerisque sed et interdum auctor. Pellentesque egestas nunc sed feugiat sed tincidunt. "}
                            data={"14 de agosto de 2024"}
                        />
                        <CardBlog
                            img={img}
                            nomeUsuario={"Usuario"}
                            titulo={"Um titulo qualquer"}
                            conteudo={"Lorem ipsum dolor sit amet consectetur. Scelerisque sed et interdum auctor. Pellentesque egestas nunc sed feugiat sed tincidunt. "}
                            data={"14 de agosto de 2024"}
                        />
                    </section>
                </div>
            </div>
        </>
    )
}

export default SistemaAprovacao;