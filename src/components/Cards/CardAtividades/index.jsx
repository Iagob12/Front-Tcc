import "../../../styles/Cards/CardAtividades/style.css";
import { FaTrash, FaPen } from "react-icons/fa";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const CardAtividades = ({ id, image, name, onClick, onDelete }) => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(id);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    navigate(`/atividades/editar/${id}`)
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
            <FaPen
              style={{ cursor: "pointer" }}
              onClick={handleEditClick}
            />
          </p>
        </div>
      )}
    </div>
  );
};

export default CardAtividades;
