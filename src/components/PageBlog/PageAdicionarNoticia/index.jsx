import React, { useState } from "react";
import "../../../styles/Blog/adicionar-noticia/style.css";
import IconUpload from "../../../assets/Blog/upload.svg";
import { X, Check } from "lucide-react";
import Button from "../../Button";
import { useNavigate } from "react-router-dom";

const AdicionarNoticia = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    tituloMateria: "",
    informacao: ""
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo de arquivo
      if (!file.type.startsWith('image/')) {
        alert("Por favor, selecione apenas arquivos de imagem.");
        return;
      }
      
      // Validar tamanho (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("A imagem deve ter no máximo 5MB.");
        return;
      }
      
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
  };

  const confirmImage = () => {
    if (imageFile) {
      alert("Imagem confirmada!");
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (loading) return;
    
    // Validação básica
    if (!formData.tituloMateria || !formData.informacao) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (!imageFile) {
      alert("Por favor, selecione uma imagem para a notícia.");
      return;
    }

    setLoading(true);

    try {
      // Converter imagem para Base64
      const reader = new FileReader();
      
      reader.onloadend = async () => {
        try {
          const base64Image = reader.result;

          // Criar o blog com a imagem em Base64
          const response = await fetch("https://backend-tcc-cgbwa9c6gjd5bjfr.brazilsouth-01.azurewebsites.net/blog/criar", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
              tituloMateria: formData.tituloMateria,
              informacao: formData.informacao,
              urlNoticia: base64Image,
              bairro: "",
              anonima: false
            })
          });

          if (response.ok) {
            alert("Notícia enviada com sucesso! Aguarde a aprovação de um administrador.");
            navigate("/blog");
          } else if (response.status === 401) {
            alert("Você precisa estar logado para criar uma notícia.");
            navigate("/login");
          } else {
            const error = await response.json();
            alert(error.message || "Erro ao enviar notícia.");
          }
        } catch (error) {
          console.error("Erro:", error);
          alert("Erro ao enviar notícia: " + error.message);
        } finally {
          setLoading(false);
        }
      };

      reader.onerror = () => {
        alert("Erro ao processar a imagem.");
        setLoading(false);
      };

      reader.readAsDataURL(imageFile);
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao processar a imagem: " + error.message);
      setLoading(false);
    }
  };

  return (
    <div className="container-form-noticia">
      <div className="content-form-noticia">
        <h2>Escreva uma notícia para agregar na nossa comunidade</h2>

        <form className="form-noticia">
          <label htmlFor="uploadImage" className="upload-label">
            {imagePreview ? (
              <div className="preview-wrapper">
                <img src={imagePreview} alt="Prévia da imagem" className="preview-image" />
                <div className="image-actions">
                  <button type="button" className="action-btn" onClick={removeImage}>
                    <X size={24} color="#fff" />
                  </button>
                  <button type="button" className="action-btn" onClick={confirmImage}>
                    <Check size={24} color="#fff" />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <img id="iconUpload"src={IconUpload} alt="Upload" />
                <span>Faça o upload da capa ou arraste o arquivo</span>
              </>
            )}
          </label>

          <input
            type="file"
            id="uploadImage"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />

          <label htmlFor="tituloMateria" className="label-noticia">Título</label>
          <input
            type="text"
            id="tituloMateria"
            name="tituloMateria"
            className="input-noticia"
            placeholder="Insira o título da sua notícia aqui"
            value={formData.tituloMateria}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="informacao" className="label-noticia">Notícia</label>
          <textarea
            id="informacao"
            name="informacao"
            className="input-noticia"
            placeholder="Escreva sua notícia aqui"
            value={formData.informacao}
            onChange={handleInputChange}
            required
          />

          <Button 
            type="submit" 
            text={loading ? "Enviando..." : "Enviar notícia"}
            onClick={handleSubmit}
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
};

export default AdicionarNoticia;
