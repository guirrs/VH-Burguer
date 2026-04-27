import Footer from '@/components/footer/footer'; // Adicionado aspas
import styles from './descricao-produto.module.css'; // Adicionado aspas
import SubHeader from '@/components/sub-header/sub-header'; // Adicionado aspas

// Corrigido o nome de DecricaoProduto para DescricaoProduto
const DescricaoProduto = () => {
  return (
    <>
      <main id={styles.page}>
        <SubHeader />
        <div id={styles.container}>
          <section id={styles.conteudo}>
            <h3>Detalhes do X-Bacon</h3>
            {/* Adicionado aspas no src */}
            <img src="../imgs/HamburguerAlcatraComBacon.png" alt="Hamburguer" />
            <section className={styles.caixaInfo}>
              <div className={`${styles.caixa} ${styles.descricao}`}>
                <h4>Descrição</h4>
                <p>Um pão brioche macio segura a fera: duas (ou três) carnes altas e suculentas, queijo cheddar derretido escorrendo pelas laterais, bacon crocante, cebola caramelizada no ponto adocicado, alface fresca, tomate e um molho especial intenso que amarra tudo. Para completar o ataque, uma camada extra de onion rings ou molho defumado que transforma cada mordida numa explosão.</p>
              </div>
              <div className={styles.caixa}>
                <h4>Preço</h4>
                <p id={styles.preco}>R$ 35,00</p>
                <h4>Categoria</h4>
                <ul>
                  <li>Premium</li>
                  <li>Artesanal</li>
                </ul>
              </div>
            </section>
          </section>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default DescricaoProduto;
