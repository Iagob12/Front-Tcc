import React, { useState } from "react";
import "../../../styles/Cards/CardFormulario/style.css";
import Button from "../../../components/Button";
import facebook from "../../../assets/CardCadastro/facebook.png";
import google from "../../../assets/CardCadastro/google.png";
import apple from "../../../assets/CardCadastro/apple.png";
import { useNavigate } from "react-router-dom";
import { ModalVerificarEmail, UseModalVerificarEmail } from "../../Modais/ModalVerificarEmail";
import { ModalRecuperarSenha, UseModalRecuperarSenha } from "../../Modais/ModalRecuperarSenha";
import { ModalLoginOTP, UseModalLoginOTP } from "../../Modais/ModalLoginOTP";

const CardCadastro = ({ title, action }) => {
    const navigate = useNavigate();
    
    // Modais
    const modalVerificarEmail = UseModalVerificarEmail();
    const modalRecuperarSenha = UseModalRecuperarSenha();
    const modalLoginOTP = UseModalLoginOTP();

    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        if (loading) return; // Prevenir múltiplos cliques
        
        setLoading(true);
        
        try {
            const url =
                title === "Login"
                    ? "https://backend-tcc-cgbwa9c6gjd5bjfr.brazilsouth-01.azurewebsites.net/auth/login"
                    : "https://backend-tcc-cgbwa9c6gjd5bjfr.brazilsouth-01.azurewebsites.net/auth/register-modern";

            const body =
                title === "Login"
                    ? { email: formData.email, senha: formData.senha }
                    : formData;

            // Se for cadastro, abrir modal imediatamente
            if (title !== "Login") {
                modalVerificarEmail.open(formData.email);
            }

            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(body)
            });

            if (response.ok) {
                const data = await response.json();
                
                if (title === "Login") {
                    // Cookie já foi definido pelo backend
                    // Disparar evento para atualizar o Header
                    window.dispatchEvent(new Event('loginSuccess'));
                    navigate("/");
                } else {
                    // Cadastro bem-sucedido - modal já está aberto
                    console.log("✅ Cadastro realizado! Email enviado.");
                }
            } else if (response.status === 401) {
                alert("E-mail ou senha incorretos.");
            } else if (response.status === 403) {
                const error = await response.json();
                alert(error.message || "Email não verificado.");
            } else {
                const error = await response.json();
                alert(error.message || "Erro ao processar requisição.");
                // Se for cadastro e deu erro, fechar o modal
                if (title !== "Login") {
                    modalVerificarEmail.close();
                }
            }
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao conectar com o servidor.");
            // Se for cadastro e deu erro, fechar o modal
            if (title !== "Login") {
                modalVerificarEmail.close();
            }
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Novo handler para login com Google
    const handleGoogleLogin = () => {
        window.location.href = "https://backend-tcc-cgbwa9c6gjd5bjfr.brazilsouth-01.azurewebsites.net/oauth2/authorization/google";
    };

    return (
        <div className="background-card">
            <div className="card-formulario">
                <h1>{title}</h1>
                <div className="inputs">
                    {title !== "Login" && (
                        <div className="input">
                            <label htmlFor="nome">Nome completo</label>
                            <input
                                type="text"
                                name="nome"
                                value={formData.nome}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    <div className="input">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            name="senha"
                            value={formData.senha}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <Button 
                    text={loading ? "Processando..." : action} 
                    onClick={handleSubmit}
                    disabled={loading}
                />

                {/* Opções extras para Login */}
                {title === "Login" && (
                    <div className="login-extras">
                        <button 
                            type="button"
                            className="link-button"
                            onClick={() => modalRecuperarSenha.open()}
                        >
                            Esqueci minha senha
                        </button>
                        <span className="separator">|</span>
                        <button 
                            type="button"
                            className="link-button"
                            onClick={() => modalLoginOTP.open()}
                        >
                            Entrar com código
                        </button>
                    </div>
                )}

                <div className="opcoes-login">
                    {title !== "Login" ? (
                        <p className="criar-conta">
                            já tem uma conta?
                            <span onClick={() => navigate("/login")}> Faça login </span>
                        </p>
                    ) : (
                        <p className="criar-conta">
                            não tem uma conta?
                            <span onClick={() => navigate("/cadastrar-se")}> Cadastre-se aqui </span>
                        </p>
                    )}

                    <div className="social-buttons">
                        <button className="social-btn facebook">
                            <img src={facebook} alt="Facebook" />
                        </button>

                        {/* 🔹 Botão Google que redireciona para o backend */}
                        <button
                            className="social-btn google"
                            onClick={handleGoogleLogin}
                        >
                            <img src={google} alt="Google" />
                        </button>

                        <button className="social-btn apple">
                            <img src={apple} alt="Apple" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Modais */}
            <ModalVerificarEmail 
                isOpen={modalVerificarEmail.isOpen}
                onClose={modalVerificarEmail.close}
                email={modalVerificarEmail.email}
                onSuccess={() => navigate("/login")}
            />

            <ModalRecuperarSenha 
                isOpen={modalRecuperarSenha.isOpen}
                onClose={modalRecuperarSenha.close}
            />

            <ModalLoginOTP 
                isOpen={modalLoginOTP.isOpen}
                onClose={modalLoginOTP.close}
                onSuccess={() => navigate("/")}
            />
        </div>
    );
};

export default CardCadastro;
