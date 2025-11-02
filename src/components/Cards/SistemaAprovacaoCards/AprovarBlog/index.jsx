import "../../../../styles/Cards/SistemaAprovacaoCards/AprovarBlog/style.css"

const CardBlog = ({ img, titulo, data, nomeUsuario, conteudo }) => {
    return (
        <>
            <div className="blog-preview">
                <img src={img} alt="Capa do blog" />
                <div className="conteudo-blog">
                    <div className="dados-autor">
                        <p>{nomeUsuario}</p>
                        <p><span className="blog-data-span">{data}</span></p>
                    </div>
                    <p className="blog-titulo-span"><span>{titulo}</span></p>
                    <p>{conteudo}</p>
                </div>
            </div>
        </>
    )
}

export default CardBlog;