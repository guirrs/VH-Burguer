import Link from "next/link";
import CardProduto from "../card-produto/card-produto";
import styles from "./lista-produto.module.css";

const ListaProduto = () => {
    return (
        <>
            <div id={styles.Container}>
                <button id={styles.Filtro}>
                    <p>Filtrar</p>
                    <img src="../imgs/vector.svg" alt="" />
                </button>
                <div id={styles.Listas}>
                    <Link href="/promocoes">Todas as promoções</Link>
                    <Link href="/produtos">Todos os Produtos</Link>
                </div>
            </div>
            <div id={styles.Itens}>
                <CardProduto />
                <CardProduto />
                <CardProduto />
            </div>
        </>
    )
}

export default ListaProduto;