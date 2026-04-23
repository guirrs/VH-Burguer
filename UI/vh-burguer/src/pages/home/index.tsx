import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import styles from "./home.module.css"
import ListaProduto from "@/components/lista-produto/lista-produto";

const Home = () => {
    return (
        <>
            <Header />
            <main>
                <section className={styles.banner}>
                    <h1>BEM-VINDO AO VH BURGUER</h1>
                    <img src="../imgs/foto_de_hamburgueres.png" alt="" />
                    <div>
                        <button id={styles.btn_atendente}>Chamar atendente</button>
                        <button id={styles.btn_cardapio}>Ver cárdapio</button>
                    </div>
                </section>


                <section className={styles.destaque}>
                    <div id={styles.ms_pedidos}>
                        <p>Os queridinhos da galera</p>
                        <h2>MAIS PEDIDOS</h2>
                    </div>
                    <div id={styles.img_pequenas}>
                        <div className={`${styles.lanches} ${styles.bacon}`}>
                            <p>Lanches com</p>
                            <h2>MUITO BACON</h2>
                        </div>
                        <div className={`${styles.lanches} ${styles.combos}`}>
                            <p>Se tiver muita fome</p>
                            <h2>SUPER COMBOS</h2>
                        </div>
                    </div>
                </section>

                <section className={styles.cardapio}>
                    <h3>CARDÁPIO</h3>
                    <ListaProduto/>
                </section>
                <section  className={styles.unidades}>
                    <img src="../imgs/unidade.jpeg" alt="" />
                    <div>
                        <h4>NOSSAS UNIDADES</h4>
                        <ul>
                            <li>Centro – Av. Aurora, 742</li>
                            <li>Jardim – Av. das Palmeiras, 1280</li>
                            <li>Norte – Av. Horizonte, 305</li>
                            <li>Sul – Av. Nova Esperança, 910</li>
                        </ul>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Home;