import "../../../styles/PageSistemaAprovacao/BlogDetails/style.css"
import { FaCalendarAlt, FaClock, FaTimes } from "react-icons/fa";
import img from "../../../assets/teste/colgate.png"

const BlogDetails = () => {
    return (
        <>
            <div className="container-detalhes-blog">
                <h1>Parceria Nova</h1>
                <div className="detalhes-blog-cabecalho">
                    <div className="detalhe-item">
                        <FaCalendarAlt className="icon-item" />
                        <p>04 de Agosto de 2025</p>
                    </div>
                    <p>|</p>
                    <div className="detalhe-item">
                        <FaClock className="icon-item" />
                        <p>14:30</p>
                    </div>
                    <div className="fechar-detalhes">
                        <FaTimes />
                    </div>
                </div>
                <div className="content-detalhes-blog">
                    <img src={img} alt="Capa do blog" />
                    <p>Fundadora da ONG Amigos do Bem, com mais de 10 mil voluntários e impacto social validado, a empreendedora Alcione Albanesi revela como transformar indignação em ação… com eficiência e amor. <br />
                    Por: Marco Marcelino
                        Com uma trajetória que une ousadia empresarial e entrega ao impacto social, Alcione Albanesi construiu um legado raro: fez da excelência em gestão um instrumento para transformar vidas. Depois de fundar e liderar a FLC, empresa que dominou o mercado de lâmpadas fluorescentes no Brasil, ela tomou uma decisão radical: vender o negócio e se dedicar integralmente, de forma voluntária, à ONG Amigos do Bem. Criada em 1993 após uma visita ao sertão nordestino, a organização cresceu com estrutura, metas claras e uma cultura baseada em resultados e empatia.</p>
                        <div className="opcoes-aprovar">
                            <button>Aceitar</button>
                            <button>Rejeitar</button>
                        </div>
                </div>
            </div>
        </>
    )
}

export default BlogDetails;