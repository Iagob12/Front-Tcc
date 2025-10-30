import "../../../styles/Eventos/adicionar-evento/style.css";
import Button from "../../Button";
import IconUpload from "../../../assets/Blog/upload.svg";

const AdicionarEvento = () => {
  return (
    <>
      <div className="container-form-evento">
        {/*Aqui será a lógica para quando for atualizar, será "Editar evento" */}
        <h1 className="titulo-form-evento">Novo evento</h1>
        <div className="content-form-evento">
          <form className="form-evento">

            <label htmlFor="nome">Nome</label>
            <input name="nome" type="text" placeholder="Nome do evento" />

            <div className="data-hora">
              <label htmlFor="data">Data e hora</label>
              <input name="data" type="date" />
              <input name="data" type="time" />
            </div>

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
            <textarea name="descricao" placeholder="Digite aqui..."></textarea>

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
  );
};

export default AdicionarEvento;
