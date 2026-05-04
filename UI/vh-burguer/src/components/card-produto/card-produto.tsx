import Link from "next/link";
import styles from "./card-produto.module.css"

type Produto = {
    titulo: string,
    descricao: string,
    preco: number,
    imagem: string,
}

const CardProduto = ({ titulo, descricao, preco, imagem, produtoID }: Produto) => {
    return (
        <article>
            <div id={styles.card}>
                <Link href={"/detalhe-produto/" + produtoID}>
                    <img src={imagem} alt="" />
                </Link>
                <div id={styles.titulo}>
                    <h2>{titulo}</h2>
                </div>
                <p>{descricao}</p>
                <div id={styles.preco}>
                    <h5>{formatarPreco(preco)}</h5>
                </div>
            </div>
        </article>
    )
}

export default CardProduto;