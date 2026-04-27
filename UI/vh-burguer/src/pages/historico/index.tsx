import Footer from "@/components/footer/footer"
import SubHeader from "@/components/sub-header/sub-header"
import styles from "./historico.module.css"
import ProdutoHistorico from "@/components/produto-historico/produto-historico";

const Historico = () =>{
    return(
        <>
        <SubHeader/>
        <section id={styles.container}>
            <h3>Histórico de alterações: Monstro</h3>
            <ul>
                <li>Data alteração</li>
                <li>Nome anterior</li>
                <li>Preço Anterior</li>
            </ul>
            <hr></hr>
            <div>
                <ProdutoHistorico/>
                <ProdutoHistorico/>
                <ProdutoHistorico/>
            </div>
        </section>
        <Footer/>
        </>
    );
}

export default Historico