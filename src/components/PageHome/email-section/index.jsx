import "../../../styles/Home/Email-section/style.css"
import Button from "../../Button"
import Title from "../../Title"

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

        </section>
        </>
    )
}
export default EmailSection