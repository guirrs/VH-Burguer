import Footer from "@/components/footer/footer";
import SubHeader from "@/components/sub-header/sub-header";
import styles from "./produto.module.css"
import { useEffect, useState } from "react";
import { listarCategoria } from "../api/categoriaService";

interface Categoria {
    categoriaID: number,
    nome: string
}

const Produto = () => {

    const [categorias, setCategorias] = useState<Categoria[]>([]);

    const [nome, setNome] = useState<string>("");
    const [descricao, setDescricao] = useState<string>("");
    const [preco, setPreco] = useState<string>("");
    const [imagem, setImagem] = useState<File | null>();
    const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<number[]>([]);

    async function listarCategoriaEmProduto() {
        const lista = await listarCategoria();

        //caso voce só chama a lista, vai chamar toda a requisicao, por isso que voce tem que especificar só quer a lista do dados
        setCategorias(lista.data);

        console.log(lista.data);
    }

    //quando produto for renderizado, a funcao listarCategoriaEmProduto acontece
    useEffect(() => {
        listarCategoriaEmProduto();
    }, [])

    return (
        <>
            <SubHeader />
            <section id={styles.container}>
                <h3>CRIAR PRODUTO</h3>
                <div className={styles.info}>
                    <label>Nome do produto</label>
                    <input type="text" placeholder="BBQ Especial" value={nome} onChange={(e) => setNome(e.target.value)} />
                </div>
                <div className={`${styles.info} ${styles.descricao}`}>
                    <label>Descrição</label>
                    <input type="text" placeholder="Hamburguer com molho barbecue defumado com cebola caramelizada." value={descricao} onChange={(e) => setDescricao(e.target.value)}/>
                </div>
                <div className={`${styles.info} ${styles.preco}`}>
                    <label>Preço(R$)</label>
                    <input type="text" placeholder="40,00" value={preco} onChange={(e) => setPreco(e.target.value)}/>
                </div>
                <div className={styles.info}>
                    <label>Categoria</label>
                    <select multiple onChange={(e) => setCategoriasSelecionadas(
                        
                    )}>
                        {categorias.map((item) => (
                            <option value={item.categoriaID} key={item.categoriaID}>{item.nome}</option>
                        )
                        )}
                    </select>
                </div>
                <div className={`${styles.info} ${styles.url}`}>
                    <label>Url Imagem</label>
                    <input type="file" onChange={(e) => {
                        if(e.target.files && e.target.files[0]){
                            setImagem(e.target.files[0]);
                        }

                    }} />
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