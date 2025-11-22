import "../../../styles/Cards/CardAtividades/style.css";
import { FaTrash, FaPen } from "react-icons/fa";
import { useAuth } from "../../../hooks/useAuth";

const CardAtividades = ({ id, image, name, onClick, onDelete }) => {
  const { isAdmin } = useAuth();
  
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(id);
  };

  return (
    <div className="cardAtiv-container" onClick={onClick}>
      <img className="icon-card-atividade" src={image} alt={`foto da aula de ${name}`} />
      <h3>{name}</h3>

      {isAdmin && (
        <div className="opcoes-modificar-aula">
          <p>
            <FaTrash style={{ color: "red", cursor: "pointer" }} onClick={handleDeleteClick} />
          </p>
          <p>
            <FaPen style={{ cursor: "pointer" }} />
          </p>
        </div>
      )}
    </div>
  );
};

export default CardAtividades;
