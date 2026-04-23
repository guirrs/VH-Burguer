import Footer from "@/components/footer/footer";
import SubHeader from "@/components/sub-header/sub-header";
import styles from "./produto.module.css"

const Produto = () => {
    return (
        <>
            <SubHeader />
            <section id={styles.container}>
                    <h3>CRIAR PRODUTO</h3>
                    <div className={styles.info}>
                        <h4>Nome do produto</h4>
                        <input type="text" />
                    </div>
                    <div className={styles.info}>
                        <h4>Descrição</h4>
                        <input type="text" />
                    </div>
                    <div className={styles.info}>
                        <h4>Preço(R$)</h4>
                        <input type="text" />
                    </div>
                    <div className={styles.info}>
                        <h4>Categoria</h4>
                        <input type="text" />
                        <a href="">Adicionar categoria</a>
                    </div>
                    <div className={styles.info}>
                        <h4>Url Imagem</h4>
                        <input type="text" />
                    </div>

                    <div>
                        <button>Adicionar Promoção</button>
                        <button>Salvar</button>
                    </div>
            </section>
            <Footer />
        </>
    )
}

export default Produto;