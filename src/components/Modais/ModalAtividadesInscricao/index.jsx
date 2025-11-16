import { useEffect, useRef } from "react";
import Button from "../../Button";
import "../../../styles/Modais/modalAtividadeInscricao/style.css";
import { apiPost } from "../../../config/api"; // sua função fetch POST

const ModalAtividadeInscricao = ({ isOpen, onClose, atividade, cursoId, vagas }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const handleSubmit = async () => {
    try {
      const usuario = JSON.parse(localStorage.getItem("userData"));
      if (!usuario || !usuario.id) throw new Error("Usuário não encontrado.");

      const dto = {
        idUsuario: usuario.id,
        idCurso: cursoId
      };

      const response = await apiPost("/inscricao/inscrever", dto);
      if (response.ok) {
        alert(`Inscrição realizada com sucesso na atividade: ${atividade}!`);
        onClose();
      } else {
        const data = await response.json();
        alert(`Erro ao se inscrever: ${data.message || response.statusText}`);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao se inscrever. Tente novamente.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-inscricao-overlay">
      <div ref={modalRef} className="modal-inscricao-container">
        <h3>Inscreva-se na atividade</h3>
        <p className="atividade-nome">{atividade}</p>
        <p className="vagas-disponiveis">
          Vagas disponíveis: <strong>{vagas}</strong>
        </p>
        <Button text="Enviar inscrição" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default ModalAtividadeInscricao;
