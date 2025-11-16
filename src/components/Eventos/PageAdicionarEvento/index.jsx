import React, { useState, useRef, useCallback } from "react";
import "../../../styles/Blog/adicionar-noticia/style.css";
import Button from "../../Button";
import IconUpload from "../../../assets/Blog/upload.svg";
import { X, Check } from "lucide-react";
import ImageCropModal from "../../PageBlog/ImageCropModal";
import { apiPost, apiUploadFile } from "../../../config/api";
import { useNavigate } from "react-router-dom";
import { useToast } from '../../Toast/useToast';
import ToastContainer from '../../Toast/ToastContainer';

const AdicionarEvento = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const fileInputRef = useRef(null);

  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [endereco, setEndereco] = useState("");
  const [regiao, setRegiao] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    // Validações
    if (!nome || !data || !hora || !estado || !cidade || !endereco || !regiao || !descricao) {
      toast.warning("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (!imagePreview) {
      toast.warning("Por favor, selecione uma imagem para o evento.");
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

      const dataEvento = new Date(data);
      const horaEvento = hora;

      const eventoData = {
        nome,
        descricao,
        data: `${dataEvento.toISOString().split("T")[0]}T${horaEvento}:00`,
        local: `${estado} - ${cidade}, ${endereco}, ${regiao}`,
        imagem: imageUrl,
      };

      const apiResponse = await apiPost("/evento/marcar", eventoData);

      if (apiResponse.ok) {
        toast.success("Evento cadastrado com sucesso!");

        setNome("");
        setData("");
        setHora("");
        setEstado("");
        setCidade("");
        setEndereco("");
        setRegiao("");
        setDescricao("");
        setImagePreview(null);
        setImageFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        setTimeout(() => {
          navigate("/eventos");
        }, 1500);
      } else if (apiResponse.status === 401) {
        toast.error("Você precisa estar logado para criar um evento.");
      } else if (apiResponse.status === 403) {
        toast.error("Você não tem permissão para criar um evento.");
      } else {
        const error = await apiResponse.json();
        toast.error(error.message || "Erro ao cadastrar evento.");
      }
    } catch (error) {
      console.error("Erro:", error);
      toast.error("Erro ao cadastrar evento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer toasts={toast.toasts} removeToast={toast.removeToast} />
      <div className="container-form-noticia">
        <div className="content-form-noticia">
          <h2>Cadastre um novo evento</h2>

          <form className="form-noticia" onSubmit={handleSubmit}>
            {/* Upload de Imagem com Drag and Drop */}
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
                    <button type="button" className="action-btn" onClick={(e) => { e.preventDefault(); }}>
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

            <label htmlFor="nome" className="label-noticia">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              className="input-noticia"
              placeholder="Digite o nome do evento"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="data" className="label-noticia">Data</label>
                <input
                  type="date"
                  id="data"
                  name="data"
                  className="input-noticia"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="hora" className="label-noticia">Hora</label>
                <input
                  type="time"
                  id="hora"
                  name="hora"
                  className="input-noticia"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="estado" className="label-noticia">Estado</label>
                <input
                  type="text"
                  id="estado"
                  name="estado"
                  className="input-noticia"
                  placeholder="Digite o estado"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="cidade" className="label-noticia">Cidade</label>
                <input
                  type="text"
                  id="cidade"
                  name="cidade"
                  className="input-noticia"
                  placeholder="Digite a cidade"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  required
                />
              </div>
            </div>

            <label htmlFor="endereco" className="label-noticia">Endereço</label>
            <input
              type="text"
              id="endereco"
              name="endereco"
              className="input-noticia"
              placeholder="Digite o endereço completo"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              required
            />

            <label htmlFor="regiao" className="label-noticia">Região</label>
            <input
              type="text"
              id="regiao"
              name="regiao"
              className="input-noticia"
              placeholder="Digite a região ou bairro"
              value={regiao}
              onChange={(e) => setRegiao(e.target.value)}
              required
            />

            <label htmlFor="descricao" className="label-noticia">Descrição</label>
            <textarea
              id="descricao"
              name="descricao"
              className="input-noticia"
              placeholder="Descreva o evento em detalhes"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />

            <Button 
              type="submit"
              text={loading ? "Salvando..." : "Salvar"}
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

export default AdicionarEvento;
