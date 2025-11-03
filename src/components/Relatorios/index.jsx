import { useState } from "react";
import Header from "../Header"
import "../../styles/PageRelatorios/style.css"
import { FaDownload } from "react-icons/fa";

const Relatorios = () => {
    const [seletor, setSeletor] = useState("");

    return (
        <>
            <Header />
            <div className="container-relatorios">
                <section className="content-container-relatorios">
                    <div className="cabecalho-relatorios">
                        <h1>Relatórios</h1>
                        <select 
                        value={seletor}
                        onChange={(e) => setSeletor(e.target.value)}
                        >
                            <option value="" disabled hidden>
                                Selecione uma opção
                            </option>
                            <option value="USUARIOS">Usuários</option>
                            <option value="DOACOES">Doações</option>
                        </select>
                    </div>
                    {seletor === "" && ( <p>Nenhum tipo de relatório selecionado!</p> )}
                    {seletor === "USUARIOS" && (
                        <p><FaDownload /> Baixar relatório de usuários</p>
                    )}
                    {seletor === "DOACOES" && (
                        <p><FaDownload /> Baixar relatório de doações</p>
                    )}
                </section>
            </div>
        </>
    )
}

export default Relatorios;