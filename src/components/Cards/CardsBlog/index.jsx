import "../../../styles/Cards/CardBlog/style.css"
import Blur from "../../../assets/Blog/blur.svg"
const CardBlog = ({ img, dateTime, titulo, noticia}) => {
    return(
        <>
        <article className="card-blog">
             <img src={Blur} className="blur"/>
            <img src={img} alt="Imagem da noticia" />
           
           <div className="card-blog-info">
            <p className="dateTime">{dateTime}</p>
            <div className="linha-blog"></div>
            <h4>{titulo}</h4>
            <p className="noticia">{noticia}</p>
            <button className="btn-blog">Continue →</button>
           </div>
            

        </article>
        </>
    )
}
export default CardBlog;