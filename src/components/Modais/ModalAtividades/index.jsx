import Button from "../../Button";
import "../../../styles/Modais/modalAtividades/style.css"

const ModalAtividades = ({ aula, data, horario, isOpen, onClose, position }) => {
  if (!isOpen || !position) return null;

  const style = {
    position: "absolute",       
    top: position.top + "px",
    left: position.left + "px",
    width: position.width + "px",
    padding: "20px 30px",
    background: "#fff",
    textAlign: "center",
    borderRadius: "15px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    zIndex: 1000,
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={style} onClick={e => e.stopPropagation()}>
        <h3>{aula}</h3>
        <p>{data}</p>
        <p>{horario}</p>
        <Button text="Inscrever-se" />
      </div>
    </div>
  );
};
export default ModalAtividades;