import { useState, useEffect, useMemo } from "react";
import CardBlog from "../../Cards/CardsBlog";
import Title from "../../Title";
import "../../../styles/Blog/section-blog/style.css"
import { Link } from "react-router-dom";
import { apiGet, apiDelete } from '../../../config/api';
import { useAuth } from '../../../hooks/useAuth';
import { useToast } from '../../Toast/useToast';
import ToastContainer from '../../Toast/ToastContainer';
import { FaTrash } from 'react-icons/fa';

const SectionBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isAdmin } = useAuth();
    const toast = useToast();
    const [deletingBlogId, setDeletingBlogId] = useState(null);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const response = await apiGet('/blog/aprovados');

            if (response.ok) {
                const data = await response.json();
                console.log("Blogs recebidos:", data);
                // Ordenar por data mais recente primeiro
                const sortedData = Array.isArray(data) 
                    ? data.sort((a, b) => {
                        const dateA = new Date(a.dataPostagem || 0);
                        const dateB = new Date(b.dataPostagem || 0);
                        return dateB - dateA;
                    })
                    : [];
                console.log("Blogs ordenados:", sortedData);
                setBlogs(sortedData);
            } else {
                console.error("Erro ao buscar blogs");
            }
        } catch (error) {
            console.error("Erro:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteBlog = async (blogId, e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (!window.confirm("Tem certeza que deseja excluir este blog? Esta ação não pode ser desfeita.")) {
            return;
        }

        setDeletingBlogId(blogId);
        try {
            const response = await apiDelete(`/blog/deletar/${blogId}`);
            if (response.ok) {
                toast.success("Blog excluído com sucesso!");
                fetchBlogs();
            } else {
                const error = await response.json();
                toast.error(error.message || "Erro ao excluir o blog.");
            }
        } catch (error) {
            console.error("Erro ao excluir blog:", error);
            toast.error("Erro ao excluir o blog.");
        } finally {
            setDeletingBlogId(null);
        }
    };

    const formatDate = useMemo(() => {
        return (dateString) => {
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
    }, []);


    return (
        <>
            <ToastContainer toasts={toast.toasts} removeToast={toast.removeToast} />
            <section className="section-blog">
                <Title title="Notícias" />
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
                                <div key={blog.id} className="blog-card-container">
                                    <Link to={`/blog/${blog.id}`} className="link-card-blog">
                                        <CardBlog
                                            img={blog.urlNoticia}
                                            dateTime={formatDate(blog.dataPostagem)}
                                            titulo={blog.tituloMateria}
                                            noticia={blog.informacao?.substring(0, 150) + (blog.informacao?.length > 150 ? '...' : '')}
                                        />
                                    </Link>
                                    {isAdmin && (
                                        <button
                                            className="btn-delete-blog"
                                            onClick={(e) => handleDeleteBlog(blog.id, e)}
                                            disabled={deletingBlogId === blog.id}
                                            title={deletingBlogId === blog.id ? "Excluindo..." : "Excluir blog"}
                                        >
                                            <FaTrash />
                                        </button>
                                    )}
                                </div>
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