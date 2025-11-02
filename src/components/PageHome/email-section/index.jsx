import PageSistemaAprovação from "../../../pages/SistemaAprovacao"
import "../../../styles/Home/Email-section/style.css"
import Button from "../../Button"
import Title from "../../Title"
import { Link } from "react-router-dom"

const EmailSection = ()=>{
    return(
        <>
        <section className="email-section">
            <div className="email-container">
                
                <div className="email-content">
                    <div className="email-info">
                        <h2>Fique por dentro!</h2>
                        <p>receba as notificações dos nossos eventos e fique por dentro!</p>
                    </div>
                    
                    <div className="email-input">
                        <form>
                            <input type="email" placeholder="Seu email aqui"/>
                            <Button text="Enviar" primary={true}/>
                        </form>

                    </div>
               
                </div>
            </div>
            {/* <Link to="/sistema-aprovacao" id="btn-blog" className="btn-link">
                    Sistema de aprovação
            </Link> */}
        </section>
        </>
    )
}
export default EmailSection