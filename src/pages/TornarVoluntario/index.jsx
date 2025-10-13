import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import main_img from '../../assets/TornarVoluntario/main.png'
import "../../styles/TornarVoluntario/style.css"
import { Link } from 'react-router-dom';


export default function TornarVoluntario() {
    return (
        <>
            <Header />
            <main className="main-container">
                <img src={main_img} />
                <div className="content-container">
                    <h1>
                        A mudança <br /> que o mundo <br />
                        começa com <br /> sua atitude!
                    </h1>
                    <div className="text-container">
                        <p>Venha fazer <br /> parte!</p>
                        <Link to="/">
                            <Button
                            text={"Quero ser um voluntário!"}
                            primary={false}
                            className="btn-voluntario"
        />
                        </Link>

                    </div>
                </div>
                <div className="overlay-capa"></div>
            </main>
            <Footer />
        </>
    )
}