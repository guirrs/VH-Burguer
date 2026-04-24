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
                        <label>Nome do produto</label>
                        <input type="text" placeholder="BBQ Especial"/>
                    </div>
                    <div className={`${styles.info} ${styles.descricao}`}>
                        <label>Descrição</label>
                        <input type="text" placeholder="Hamburguer com molho barbecue defumado com cebola caramelizada."/>
                    </div>
                    <div className={`${styles.info} ${styles.preco}`}>
                        <label>Preço(R$)</label>
                        <input type="text" placeholder="40,00"/>
                    </div>
                    <div className={styles.info}>
                        <label>Categoria</label>
                        <input type="text" placeholder="Selecione a categoria"/>
                        <a href="">Adicionar categoria</a>
                    </div>
                    <div className={`${styles.info} ${styles.url}`}>
                        <label>Url Imagem</label>
                        <input type="text" placeholder="https://unsplash.com/pt-br/fotografias/cheseburger-de-"/>
                    </div>

                    <div id={styles.botoes}>
                        <button>Salvar</button>
                    </div>
            </section>
            <Footer />
        </>
    )
}

export default Produto;