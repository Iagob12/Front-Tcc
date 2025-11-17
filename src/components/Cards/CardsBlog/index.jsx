import { useState, memo } from "react";
import "../../../styles/Cards/CardBlog/style.css"
import Blur from "../../../assets/Blog/blur.svg"
import { getImageUrl } from "../../../config/api";

const CardBlog = memo(({ img, dateTime, titulo, noticia }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    
    // Processar URL da imagem
    let imageUrl = null;
    if (img && img.trim() !== '') {
        const imgTrimmed = img.trim();
        
        // Se for base64 (dados antigos) - verifica de várias formas
        if (imgTrimmed.startsWith('data:image') || imgTrimmed.startsWith('data:')) {
            // Já tem o prefixo data:, usar diretamente
            imageUrl = imgTrimmed;
        } else if (imgTrimmed.length > 100 && /^[A-Za-z0-9+/=\s]+$/.test(imgTrimmed)) {
            // Parece ser base64 sem prefixo - adicionar prefixo
            const base64Data = imgTrimmed.replace(/\s/g, '');
            // Detectar tipo de imagem pelo início do base64
            if (base64Data.startsWith('/9j/') || base64Data.startsWith('iVBORw0KGgo')) {
                imageUrl = `data:image/jpeg;base64,${base64Data}`;
            } else if (base64Data.startsWith('iVBORw0KGgo')) {
                imageUrl = `data:image/png;base64,${base64Data}`;
            } else {
                // Default para JPEG
                imageUrl = `data:image/jpeg;base64,${base64Data}`;
            }
        } else {
            // É uma URL, usar getImageUrl
            imageUrl = getImageUrl(imgTrimmed);
        }
        
        // Debug
        console.log('CardBlog - img recebida:', img?.substring(0, 50) + '...', 'imageUrl gerada:', imageUrl?.substring(0, 50) + '...');
    } else {
        console.log('CardBlog - Sem imagem para:', titulo);
    }

    return (
        <>
            <article className="card-blog">
                <img src={Blur} className="blur" alt="" />
                <div className="card-blog-image-wrapper">
                    {imageUrl && !imageError ? (
                        <>
                            {!imageLoaded && (
                                <div className="card-blog-image-placeholder"></div>
                            )}
                            <img 
                                src={imageUrl} 
                                alt={titulo || "Imagem da noticia"}
                                loading="lazy"
                                onLoad={() => setImageLoaded(true)}
                                onError={(e) => {
                                    console.error("Erro ao carregar imagem:", imageUrl, e);
                                    setImageError(true);
                                    setImageLoaded(true);
                                }}
                                style={{ 
                                    display: imageLoaded ? 'block' : 'none',
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                        </>
                    ) : (
                        <div className="card-blog-image-placeholder">
                            <span>Sem imagem</span>
                        </div>
                    )}
                </div>

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
});

CardBlog.displayName = 'CardBlog';

export default CardBlog;