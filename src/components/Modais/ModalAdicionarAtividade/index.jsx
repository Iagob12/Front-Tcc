import React, { useState, useRef, useCallback, useEffect } from "react";
import "../../../styles/Modais/modalAdicionarAtividade/style.css";
import Button from "../../Button";
import IconUpload from "../../../assets/Blog/upload.svg";
import { X } from "lucide-react";
import ImageCropModal from "../../PageBlog/ImageCropModal";
import { apiPost, apiUploadFile } from '../../../config/api';
import { useToast } from '../../Toast/useToast';
import ToastContainer from '../../Toast/ToastContainer';

const ModalAdicionarAtividade = ({ isOpen, onClose, onSuccess }) => {
  const toast = useToast();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const modalRef = useRef(null);
  
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    dias: "",
    horario: "",
    vagas: ""
  });

  // Fechar modal ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = 'hidden'; // Previne scroll do body
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Limpar formulário ao fechar
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        nome: "",
        descricao: "",
        dias: "",
        horario: "",
        vagas: ""
      });
      setImagePreview(null);
      setImageFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (file) => {
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
  };

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
  }, []);

  const formatTime = (timeString) => {
    // Converte "HH:mm" para "HH:mm:ss"
    if (timeString && timeString.length === 5) {
      return timeString + ":00";
    }
    return timeString;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    // Validações
    if (!formData.nome || !formData.descricao || !formData.dias || !formData.horario || !formData.vagas) {
      toast.warning("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (!imagePreview) {
      toast.warning("Por favor, selecione uma imagem para a atividade.");
      return;
    }

    const vagasNumber = parseInt(formData.vagas);
    if (isNaN(vagasNumber) || vagasNumber <= 0) {
      toast.warning("O número de vagas deve ser um valor positivo.");
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

      // Formatar horário para o formato esperado pelo backend (HH:mm:ss)
      const horarioFormatado = formatTime(formData.horario);

      const apiResponse = await apiPost('/atividade/cadastrar', {
        nome: formData.nome,
        descricao: formData.descricao,
        dias: formData.dias,
        horario: horarioFormatado,
        vagas: vagasNumber,
        imagem: imageUrl
      });

      if (apiResponse.ok) {
        toast.success("Atividade cadastrada com sucesso!");
        
        // Limpar formulário
        setFormData({
          nome: "",
          descricao: "",
          dias: "",
          horario: "",
          vagas: ""
        });
        setImagePreview(null);
        setImageFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        // Chamar callback de sucesso e fechar modal
        if (onSuccess) {
          onSuccess();
        }
        
        setTimeout(() => {
          onClose();
        }, 1500);
      } else if (apiResponse.status === 401) {
        toast.error("Você precisa estar logado para criar uma atividade.");
      } else if (apiResponse.status === 403) {
        toast.error("Você não tem permissão para criar uma atividade.");
      } else {
        const error = await apiResponse.json();
        toast.error(error.message || "Erro ao cadastrar atividade.");
      }
    } catch (error) {
      console.error("Erro:", error);
      toast.error("Erro ao cadastrar atividade. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <ToastContainer toasts={toast.toasts} removeToast={toast.removeToast} />
      <div className="modal-adicionar-atividade-overlay">
        <div ref={modalRef} className="modal-adicionar-atividade-container">
          <button className="modal-close-btn" onClick={onClose} type="button">
            <X size={24} />
          </button>
          
          <h1 className="titulo-form-atividade">Nova atividade</h1>
          <div className="content-form-atividade">
            <form className="form-atividade" onSubmit={handleSubmit}>
              <label htmlFor="nome">Nome</label>
              <input
                name="nome"
                type="text"
                placeholder="Nome da atividade"
                value={formData.nome}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="descricao">Descrição</label>
              <textarea
                name="descricao"
                placeholder="Descrição da atividade"
                value={formData.descricao}
                onChange={handleInputChange}
                required
              />

              <div className="data-hora">
                <div style={{ flex: 1 }}>
                  <label htmlFor="dias">Dias da semana</label>
                  <input
                    name="dias"
                    type="text"
                    placeholder="Ex: Segunda a Sexta"
                    value={formData.dias}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label htmlFor="horario">Horário</label>
                  <input
                    name="horario"
                    type="time"
                    value={formData.horario}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <label htmlFor="vagas">Número de vagas</label>
              <input
                name="vagas"
                type="number"
                min="1"
                placeholder="Ex: 20"
                value={formData.vagas}
                onChange={handleInputChange}
                required
              />

              {/* Upload de Imagem com Drag and Drop */}
              <label>Imagem</label>
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
                      <button
                        type="button"
                        className="action-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          removeImage();
                        }}
                      >
                        <X size={24} color="#fff" />
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

              <Button
                type="submit"
                className="button"
                text={loading ? "Salvando..." : "Salvar"}
                disabled={loading}
              />
            </form>
          </div>
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

export default ModalAdicionarAtividade;

