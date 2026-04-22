import styles from "./card-produto.module.css"

const CardProduto = () => {
    return (
        <>
            <div id={styles.card}>
            <img src="../imgs/HamburguerAlcatraComBacon.png" alt="" />
            <div id={styles.titulo}>
                <h2>Monster</h2>
            </div>
                <p>Hambúrguer brutal, suculento e exageradamente saboroso.</p>
            <div id={styles.preco}>
                <h5>R$ 35,00</h5>
            </div>
        </div>
        </>
    )
}

export default CardProduto;