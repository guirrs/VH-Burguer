import Footer from "@/components/footer/footer";
import SubHeader from "@/components/sub-header/sub-header";
import styles from "./produto.module.css"
import { useEffect, useState } from "react";
import { listarCategoria } from "../api/categoriaService";
import { Console } from "console";

interface categoria {
    categoriaID: number,
    categoriaNome: string
}

const Produto = () => {

    const[categorias, setCategorias] = useState<categoria[]>([]);

     function listarCategoriaEmProduto() {
        const lista = listarCategoria();

        //caso voce só chama a lista, vai chamar toda a requisicao, por isso que voce tem que especificar só quer a lista do dados
        setCategorias(lista.data);

        console.log(lista.data);
    }

    //quando produto for renderizado, a funcao listarCategoriaEmProduto acontece
    useEffect(() =>{
        listarCategoriaEmProduto();
    }, [])

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
                        <select>
                            {categorias.map((item) => (
                                <option value={item.categoriaID} key={item.categoriaID}>{item.categoriaNome}</option>
                            )
                            )}
                        </select>
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