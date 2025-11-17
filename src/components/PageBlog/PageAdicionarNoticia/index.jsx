import React, { useState, useRef, useCallback } from "react";
import "../../../styles/Blog/adicionar-noticia/style.css";
import IconUpload from "../../../assets/Blog/upload.svg";
import { X, Check } from "lucide-react";
import Button from "../../Button";
import ImageCropModal from '../ImageCropModal';
import { apiPost, apiUploadFile } from '../../../config/api';
import { useToast } from '../../Toast/useToast';
import ToastContainer from '../../Toast/ToastContainer';
import { useNavigate } from 'react-router-dom';

const AdicionarNoticia = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [formData, setFormData] = useState({
    tituloMateria: "",
    informacao: ""
  });

  const handleImageChange = useCallback((file) => {
    if (!file) return;

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      toast.warning("Por favor, selecione apenas arquivos de imagem.");
      return;
    }

    // Validar tamanho (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.warning("A imagem deve ter no máximo 5MB.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setImageToCrop(imageUrl);
    setImageFile(file);
    setShowCropModal(true);
  }, [toast]);

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageChange(file);
    }
  };

  const handleCropComplete = (croppedImage) => {
    setImagePreview(croppedImage);
    setShowCropModal(false);
    setImageToCrop(null);
    toast.success("Imagem ajustada com sucesso!");
  };

  const handleCropCancel = () => {
    setShowCropModal(false);
    setImageToCrop(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Drag and Drop handlers
  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleImageChange(files[0]);
    }
  }, [handleImageChange]);

  const confirmImage = () => {
    if (imageFile) {
      toast.success("Imagem confirmada!");
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

    if (!formData.tituloMateria || !formData.informacao) {
      toast.warning("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (!imagePreview) {
      toast.warning("Por favor, selecione uma imagem para a notícia.");
      return;
    }

    setLoading(true);

    try {
      // Fazer upload da imagem primeiro
      let imageUrl = null;
      
      if (imagePreview) {
        // Converter blob URL para File
        const response = await fetch(imagePreview);
        const blob = await response.blob();
        const file = new File([blob], 'imagem.jpg', { type: blob.type });
        
        const uploadResponse = await apiUploadFile(file);
        
        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json();
          imageUrl = uploadData.url;
        } else {
          const error = await uploadResponse.json();
          toast.error(error.message || "Erro ao fazer upload da imagem.");
          setLoading(false);
          return;
        }
      }

      const apiResponse = await apiPost('/blog/criar', {
        tituloMateria: formData.tituloMateria,
        informacao: formData.informacao,
        urlNoticia: imageUrl,
        bairro: "",
        anonima: false
      });

      if (apiResponse.ok) {
        toast.success("Notícia enviada com sucesso! Aguarde a aprovação de um administrador.");

        setTimeout(() => {
          navigate('/blog');
        }, 1500);
      } else if (apiResponse.status === 401) {
        toast.error("Você precisa estar logado para criar uma notícia.");
      } else if (apiResponse.status === 403) {
        toast.error("Você não tem permissão para enviar uma notícia.");
      } else {
        const error = await apiResponse.json();
        toast.error(error.message || "Erro ao enviar notícia.");
      }
    } catch (error) {
      console.error("Erro:", error);
      toast.error("Erro ao enviar notícia. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer toasts={toast.toasts} removeToast={toast.removeToast} />
      <div className="container-form-noticia">
        <div className="content-form-noticia">
          <h2>Escreva uma notícia para agregar na nossa comunidade</h2>

          <form className="form-noticia" onSubmit={handleSubmit}>
            <label
              htmlFor="uploadImage"
              className={`upload-label ${isDragging ? 'dragging' : ''} ${imagePreview ? 'has-image' : ''}`}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
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
                  <img id="iconUpload" src={IconUpload} alt="Upload" />
                  <span>Faça o upload da capa ou arraste o arquivo</span>
                </>
              )}
            </label>

            <input
              ref={fileInputRef}
              type="file"
              id="uploadImage"
              name="image"
              accept="image/*"
              onChange={handleFileInputChange}
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
              disabled={loading}
            />
          </form>

        </div>
      </div>

      {showCropModal && imageToCrop && (
        <ImageCropModal
          image={imageToCrop}
          onClose={handleCropCancel}
          onCropComplete={handleCropComplete}
        />
      )}
    </>
  );
};

export default AdicionarNoticia;
