
const CarrosselCampanha = ({image, alt, descricao}) => {
    return(
        <>

              <div className="carrossel-campanha-item">
            <img src={image} alt={`Imagem de ${alt}`}/>
            <p className="carrossel-campanha-descricao">{descricao}</p>
        </div>
        </>
    )
}
export default CarrosselCampanha