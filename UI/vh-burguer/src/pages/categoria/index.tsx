import Footer from "@/components/footer/footer";
import SubHeader from "@/components/sub-header/sub-header";
import styles from "./categoria.module.css"

const CriarCategoria = () => {
    return (
        <>
            <SubHeader />
            <section id={styles.container}>
                <h3>CRIAR CATEGORIA</h3>
                <div className={`${styles.info}`}>
                    <label>Nome categoria</label>
                    <input type="text" placeholder="https://unsplash.com/pt-br/fotografias/cheseburger-de-" />
                </div>

                <div id={styles.botoes}>
                    <button id={styles.salvar}>Salvar</button>
                    <button id={styles.cancelar}>Cancelar</button>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default CriarCategoria;