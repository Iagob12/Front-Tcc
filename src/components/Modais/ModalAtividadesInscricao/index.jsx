import { useEffect, useRef, useState } from "react";
import Button from "../../Button";
import "../../../styles/Modais/modalAtividadeInscricao/style.css";

const ModalAtividadeInscricao = ({ isOpen, onClose, atividade, vagas }) => {
  const modalRef = useRef(null);
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email || !telefone) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    console.log("Inscrição enviada:", { atividade, email, telefone });
    
    setEmail("");
    setTelefone("");
    onClose();
    
    alert(`Inscrição realizada com sucesso na atividade: ${atividade}!`);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-inscricao-overlay">
      <div ref={modalRef} className="modal-inscricao-container">
        <h3>Inscreva-se na atividade</h3>
        <p className="atividade-nome">{atividade}</p>
        <p className="vagas-disponiveis">Vagas disponíveis: <strong>{vagas}</strong></p>
        
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="E-mail" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button text="Enviar inscrição" onClick={handleSubmit} />
        </form>
      </div>
    </div>
  );
};

export default ModalAtividadeInscricao;