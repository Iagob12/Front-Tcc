import React from "react";
import Header from "../../components/Header"
import Main from "../../components/Main"
import img_main from "../../assets/ComoAjudar/img-comoAjudar.png"
import Title from "../../components/Title"
import SectionDoe from "../../components/ComoAjudar/section-doe-agora"
import SectionPlanos from "../../components/ComoAjudar/section-planos"
import Footer from "../../components/Footer"

export default function ComoAjudar() {
    return (
        <>
            <Header />
            <Main img={img_main} text={"Como Ajudar"} />
            <SectionDoe />
            <SectionPlanos />
            <Footer />
        </>
    )
}