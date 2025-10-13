import "../../../styles/Cards/CardAtividades/style.css"

const CardAtividades = ({ image, name, onClick, data, horario }) => {
  return (
    <div className="cardAtiv-container" onClick={onClick}>
      <img className="icon-card-atividade" src={image} alt={`foto da aula de ${name}`} />
      <h3>{name}</h3>
      <p>{data}</p>
        <p>{horario}</p>
    </div>
  );
};
export default CardAtividades