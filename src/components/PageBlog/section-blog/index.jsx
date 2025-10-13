import { useState, useEffect } from "react";
import CardBlog from "../../Cards/CardsBlog";
import Title from "../../Title";
import "../../../styles/Blog/section-blog/style.css"
import Dentista from "../../../assets/Blog/image-blog.svg"
import { Link } from "react-router-dom";

const SectionBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await fetch("https://backend-tcc-cgbwa9c6gjd5bjfr.brazilsouth-01.azurewebsites.net/blog/blogs", {
                method: "GET",
                credentials: "include"
            });

            if (response.ok) {
                const data = await response.json();
                setBlogs(data);
            } else {
                console.error("Erro ao buscar blogs");
            }
        } catch (error) {
            console.error("Erro:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return(
        <>
        <section className="section-blog">
            <Title title="Notícias"/>
            <div className="blog-container">
                <Link to="/adicionar-noticia" id="btn-blog" className="btn-link">
                + Adicionar notícia ao blog
                 </Link>
                <div className="cards-blog">
                    {loading ? (
                        <>
                            {[1, 2, 3, 4].map((n) => (
                                <div key={n} className="skeleton-card">
                                    <div className="skeleton-image"></div>
                                    <div className="skeleton-content">
                                        <div className="skeleton-date"></div>
                                        <div className="skeleton-title"></div>
                                        <div className="skeleton-text"></div>
                                        <div className="skeleton-text short"></div>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : blogs.length > 0 ? (
                        blogs.map((blog) => (
                            <CardBlog 
                                key={blog.id}
                                img={blog.urlNoticia || Dentista}
                                dateTime={formatDate(blog.dataPostagem)}
                                titulo={blog.tituloMateria}
                                noticia={blog.informacao}
                            />
                        ))
                    ) : (
                        <div className="no-blogs-message">
                            <p>📰 Nenhuma notícia aprovada ainda.</p>
                            <p className="subtitle">Seja o primeiro a compartilhar uma história!</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
        </>
    )
}
export default SectionBlog;