import "../../../styles/Eventos/adicionar-evento/style.css"
import Button from "../../Button";

const AdicionarEvento = () => {
    return (
        <>
            <div className="container-form-evento">
                <h1 className="titulo-form-evento">Novo evento</h1>
                <div className="content-form-evento">
                    <form className="form-evento">
                        <label htmlFor="nome">Nome</label>
                        <input name="nome" type="text" placeholder="Nome do evento" />

                        {/* Input com data e hora (seletor) */}

                        <div className="local-estado">
                            <label htmlFor="estado">Estado</label>
                            <input name="estado" type="text" />

                            <label htmlFor="cidade">Cidade</label>
                            <input name="cidade" type="text" />
                        </div>

                        <label htmlFor="endereco">Endereço</label>
                        <input name="endereco" type="text" />

                        <label htmlFor="regiao">Região</label>
                        <input name="regiao" type="text" />

                        <label htmlFor="descricao">Descrição para o evento</label>
                        <textarea name="descricao" id="" placeholder="Digite aqui..."></textarea>

                        {/* Input para colocar a imagem do evento */}

                    </form>

                    <Button text={"Salvar"} />
                </div>
            </div>
        </>
    )
}

export default AdicionarEvento;