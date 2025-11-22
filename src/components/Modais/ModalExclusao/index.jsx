import React from "react";
import logo from "../../../assets/Logos/Logo.svg";
import "../../../styles/Modais/ModalExclusao/style.css";
import Button from "../../Button";

const ModalExclusao = ({ isOpen, onClose, onConfirm, mensagem }) => {
  if (!isOpen) return null; 

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <img src={logo} alt="Logo da ONG" />
        <p>{mensagem}</p>
        <div className="modal-buttons">
          <Button text="Sim" onClick={onConfirm} className="confirmar-btn"/>
          <Button text="Não" onClick={onClose} className="cancelar-btn" />
        </div>
      </div>
    </div>
  );
};

export default ModalExclusao;