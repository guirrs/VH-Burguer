import Footer from '@/components/footer/footer'; // Adicionado aspas
import styles from './descricao-produto.module.css'; // Adicionado aspas
import SubHeader from '@/components/sub-header/sub-header'; // Adicionado aspas
import { useEffect, useState } from 'react';
import { listarPorId } from '@/pages/api/produtoService';
import { useParams } from 'next/navigation';

interface Produto{
    produtoID: number,
    nome: string,
    preco: number,
    descricao: string,
    imagemUrl: string,
    categorias: string[],
}

// Corrigido o nome de DecricaoProduto para DescricaoProduto
const DescricaoProduto = () => {

  const[produto, setProduto] = useState<Produto>();

  const params = useParams();

  const id = params?.id

  async function listarProduto(){
    try{
        const response = await listarPorId(Number(id));
        console.log(response);
        setProduto(response);
    }
    catch(error: any){
      console.log(error.message);
    }
  }

  useEffect(() =>{
    if(!id)
      return;

    setTimeout(() =>{
      listarProduto();
    }, 1000)
  }, [id]);

  return (
    <>
      <main id={styles.page}>
        <SubHeader />
        <div id={styles.container}>
          <section id={styles.conteudo}>
            <h3>Detalhes do {produto?.nome}</h3>
            {/* Adicionado aspas no src */}
            <img src={produto?.imagemUrl} alt="Hamburguer" />
            <section className={styles.caixaInfo}>
              <div className={`${styles.caixa} ${styles.descricao}`}>
                <h4>Descrição</h4>
                <p>{produto?.descricao}</p>
              </div>
              <div className={styles.caixa}>
                <h4>Preço</h4>
                <p id={styles.preco}>{produto?.preco}</p>
                <h4>Categoria</h4>
                <ul>
                  {produto?.categorias.map((cat) => (
                    <li key={cat}>{cat}</li>
                  ))}
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
