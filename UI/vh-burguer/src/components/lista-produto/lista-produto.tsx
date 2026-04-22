import CardProduto from "../card-produto/card-produto";
import styles from "./lista-produto.module.css";

const ListaProduto = () => {
    return (
        <>
            <div id={styles.Container}>
                <button>
                    <p>Filtrar</p>
                    <img src="../imgs/vector.svg" alt="" />
                </button>
                <div id={styles.Listas}>
                    <button>Todas as promoções</button>
                    <button>Todos os Produtos</button>
                </div>
            </div>
            <CardProduto />
        </>
    )
}

export default ListaProduto;