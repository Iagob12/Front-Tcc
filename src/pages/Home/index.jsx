import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Main from "../../components/PageHome/main";
import AtividadeSection from "../../components/PageHome/atividade-section";
import EstatisticaSection from "../../components/PageHome/estatisticas-section";
import CarrosselSection from "../../components/PageHome/carrossel-section";
import EmailSection from "../../components/PageHome/email-section";

const Home = () => {
    return (
        <>
            <Header />
            <Main />
            <AtividadeSection />
            <EstatisticaSection />
            <CarrosselSection />
            <EmailSection />
            <Footer />
        </>
    );
}

export default Home;
