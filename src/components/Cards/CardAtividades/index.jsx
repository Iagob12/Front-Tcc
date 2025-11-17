import { useState } from "react";
import "../../../styles/Cards/CardAtividades/style.css";

// Importar ícones das atividades
import iconBox from "../../../assets/Home/icon-box.png";
import iconCapoeira from "../../../assets/Home/icon-capoeira.png";
import iconMuay from "../../../assets/Home/icon-muay.png";
import iconDanca from "../../../assets/Home/icon-danca.png";
import iconBallet from "../../../assets/Home/icon-ballet.png";
import iconKickbox from "../../../assets/Home/kickbox.png";

// Mapeamento de nomes de atividades para ícones
const getActivityIcon = (activityName) => {
  if (!activityName) return null;
  
  const name = activityName.toLowerCase().trim();
  
  // Verificações mais específicas primeiro para evitar falsos positivos
  // Capoeira
  if (name.includes('capoeira')) {
    return iconCapoeira;
  }
  // Muay Thai
  else if (name.includes('muay thai') || name.includes('muaythai') || (name.includes('muay') && name.includes('thai'))) {
    return iconMuay;
  }
  // Kickbox
  else if (name.includes('kickbox') || name.includes('kick box') || name.includes('kick-box')) {
    return iconKickbox;
  }
  // Ballet - verificar antes de box para evitar confusão
  // Verificar "bale" primeiro (pode ser abreviação ou erro de digitação)
  else if (name === 'bale' || name.startsWith('bale ') || name.startsWith('ballet') || name.includes('ballet') || name.includes('balé')) {
    return iconBallet;
  }
  // Dança
  else if (name.includes('dança') || name.includes('danca') || name.includes('dance')) {
    return iconDanca;
  }
  // Box/Boxe - verificar palavras completas para evitar falsos positivos
  else if (name === 'box' || name === 'boxe' || 
           name.startsWith('box ') || name.startsWith('boxe ') || 
           name.endsWith(' box') || name.endsWith(' boxe') ||
           (name.includes('box') && !name.includes('yoga') && !name.includes('kick'))) {
    return iconBox;
  }
  
  return null;
};

const CardAtividades = ({ image, name, onClick }) => {
  // SEMPRE usar o ícone baseado no nome da atividade (como era antes com dados mockados)
  const iconFromName = getActivityIcon(name);
  
  // Se não houver ícone correspondente ao nome, usar Box como padrão
  const imageSrc = iconFromName || iconBox;

  return (
    <div className="cardAtiv-container" onClick={onClick}>
      <img 
        className="icon-card-atividade"
        src={imageSrc} 
        alt={`ícone da atividade ${name || ''}`}
      />
      <h3>{name || "Atividade"}</h3>
    </div>
  );
};

export default CardAtividades;
