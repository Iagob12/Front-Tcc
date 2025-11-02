import "../../../../styles/Cards/SistemaAprovacaoCards/AprovarVoluntario/style.css"

const CardVoluntario = ({fotoPerfil ,nomeVoluntario, descricao}) => {
    return (
        <>
            <div className="voluntario-preview">
                <img src={fotoPerfil} alt="Foto de perfil do voluntário" />
                <div className="dados-voluntario">
                    <p className="nome-voluntario">{nomeVoluntario}</p>
                    <p className="descricao-voluntario">{descricao}</p>
                </div>
            </div>
        </>
    )
}

export default CardVoluntario;