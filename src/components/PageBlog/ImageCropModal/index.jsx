import React, { useState, useCallback, useEffect, useRef } from 'react';
import Cropper from 'react-easy-crop';
import { X, Check, RotateCw, ZoomIn, ZoomOut } from 'lucide-react';
import '../../../styles/Blog/image-crop-modal/style.css';

const ImageCropModal = ({ image, onClose, onCropComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const cropAreaRef = useRef(null);

  // Calcular o zoom inicial para mostrar a imagem inteira
  useEffect(() => {
    if (image) {
      const img = new Image();
      img.onload = () => {
        // Função auxiliar para calcular o zoom inicial
        const calculateInitialZoom = (cropArea) => {
          const cropAreaWidth = cropArea.offsetWidth || 800;
          const cropAreaHeight = cropArea.offsetHeight || 400;
          
          // Calcular o zoom necessário para mostrar a imagem inteira
          const scaleX = cropAreaWidth / img.width;
          const scaleY = cropAreaHeight / img.height;
          const minScale = Math.min(scaleX, scaleY);
          
          // Ajustar para garantir que a imagem apareça inteira com uma pequena margem
          const calculatedZoom = Math.max(0.3, Math.min(1, minScale * 0.95));
          setZoom(calculatedZoom);
          setCrop({ x: 0, y: 0 });
        };

        // Aguardar um pouco para garantir que o elemento está renderizado
        setTimeout(() => {
          const cropArea = cropAreaRef.current;
          if (!cropArea) {
            // Se ainda não estiver disponível, tentar novamente
            setTimeout(() => {
              const retryArea = cropAreaRef.current;
              if (retryArea) {
                calculateInitialZoom(retryArea);
              }
            }, 100);
            return;
          }
          
          calculateInitialZoom(cropArea);
        }, 50);
      };
      img.src = image;
    }
  }, [image]);

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const onCropCompleteHandler = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleConfirm = async () => {
    try {
      // Se não houver rotação e zoom for 1, retornar a imagem original
      if (rotation === 0 && zoom === 1) {
        onCropComplete(image);
        return;
      }
      
      // Aplicar apenas rotação, sem cortar
      const processedImage = await getCroppedImg(
        image,
        null, // Não usar pixelCrop para não cortar
        rotation
      );
      onCropComplete(processedImage);
    } catch (e) {
      console.error(e);
    }
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  return (
    <div className="crop-modal-overlay">
      <div className="crop-modal-container">
        <div className="crop-modal-header">
          <h3>Ajustar Imagem</h3>
          <button className="close-crop-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="crop-area" ref={cropAreaRef}>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={undefined}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropCompleteHandler}
            restrictPosition={false}
            minZoom={0.1}
            maxZoom={5}
          />
        </div>

        <div className="crop-controls">
          <div className="control-group">
            <label>
              <ZoomOut size={20} />
              Zoom
              <ZoomIn size={20} />
            </label>
            <input
              type="range"
              min={0.1}
              max={5}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="zoom-slider"
            />
          </div>

          <button className="rotate-btn" onClick={handleRotate}>
            <RotateCw size={20} />
            Girar
          </button>
        </div>

        <div className="crop-actions">
          <button className="cancel-btn" onClick={onClose}>
            <X size={20} />
            Cancelar
          </button>
          <button className="confirm-btn" onClick={handleConfirm}>
            <Check size={20} />
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180;
}

async function getCroppedImg(imageSrc, pixelCrop, rotation = 0) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Se não houver rotação, retornar a imagem original sem cortar
  if (rotation === 0) {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
  } else {
    // Aplicar rotação mantendo a imagem inteira
    const maxSize = Math.max(image.width, image.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

    canvas.width = safeArea;
    canvas.height = safeArea;

    ctx.translate(safeArea / 2, safeArea / 2);
    ctx.rotate(getRadianAngle(rotation));
    ctx.translate(-safeArea / 2, -safeArea / 2);

    ctx.drawImage(
      image,
      safeArea / 2 - image.width * 0.5,
      safeArea / 2 - image.height * 0.5
    );

    // Calcular a área visível da imagem rotacionada
    const rotatedWidth = Math.abs(image.width * Math.cos(getRadianAngle(rotation))) + 
                         Math.abs(image.height * Math.sin(getRadianAngle(rotation)));
    const rotatedHeight = Math.abs(image.width * Math.sin(getRadianAngle(rotation))) + 
                          Math.abs(image.height * Math.cos(getRadianAngle(rotation)));

    // Criar novo canvas com o tamanho da imagem rotacionada
    const finalCanvas = document.createElement('canvas');
    finalCanvas.width = rotatedWidth;
    finalCanvas.height = rotatedHeight;
    const finalCtx = finalCanvas.getContext('2d');

    // Desenhar apenas a área da imagem original (sem cortes)
    finalCtx.drawImage(
      canvas,
      (safeArea - rotatedWidth) / 2,
      (safeArea - rotatedHeight) / 2,
      rotatedWidth,
      rotatedHeight,
      0,
      0,
      rotatedWidth,
      rotatedHeight
    );

    return new Promise((resolve) => {
      finalCanvas.toBlob((blob) => {
        resolve(URL.createObjectURL(blob));
      }, 'image/jpeg', 0.9);
    });
  }

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(URL.createObjectURL(blob));
    }, 'image/jpeg', 0.9);
  });
}

export default ImageCropModal;