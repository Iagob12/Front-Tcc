import "../../../styles/Home/Estatistica-section/style.css"
import ProgressCircle from "../../Progress/ProgressCircle"

const EstatisticaSection = () =>{
    return(
        <>
        <div className="parallax">
            <h2>Como estamos <br /> agindo para <br /> mudar o mundo</h2>
            <div className="dados-estatisticos">
                <div className="circles-row">
                    <ProgressCircle value={30} label="Cestas básicas entregues todo mês" />
                    <ProgressCircle value={45} label="Famílias ajudadas mensalmente" />
                    <ProgressCircle value={50} label="Crianças matriculadas em atividades" />
                </div>
            </div>
        </div>
        </>
    )   
}
export default EstatisticaSection