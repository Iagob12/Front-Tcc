import "../../../styles/Home/AdicionarAtividade/style.css"
import Button from "../../Button";
import IconUpload from "../../../assets/Blog/upload.svg";

const AdicionarAtividade = () => {
    return (
        <>
            <div className="container-form-atividade">
                {/*Aqui será a lógica para quando for atualizar, será "Editar atividade" */}
                <h1 className="titulo-form-atividade">Nova atividade</h1>
                <div className="content-form-atividade">
                    <form className="form-atividade">

                        <label htmlFor="nome">Nome</label>
                        <input name="nome" type="text" placeholder="Nome da atividade" />

                        <label htmlFor="descricao">Descrição</label>
                        <input name="descricao" type="text" placeholder="Descrição da atividade" />

                        <div className="data-hora">
                            <label htmlFor="data">Data e hora</label>
                            <input name="data" type="text" placeholder="Segunda a Sexta"/>
                            <input name="data" type="time" />
                        </div>

                        <label htmlFor="vagas">Número de vagas</label>
                        <input name="vagas" type="number" />

                        {/* Input para colocar a imagem do evento */}
                        <label>Imagem</label>
                        <label htmlFor="uploadImage" className="upload-label">
                            {/* Sem lógica*/}
                            <img id="iconUpload" src={IconUpload} alt="Upload" />
                            <span>Faça o upload da capa ou arraste o arquivo</span>
                        </label>

                        <Button className="button" text={"Salvar"} />
                    </form>
                </div>
            </div>
        </>
    )
}

export default AdicionarAtividade;