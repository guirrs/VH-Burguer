import Link from "next/link";
import CardProduto from "../card-produto/card-produto";
import styles from "./lista-produto.module.css";
import { useEffect, useState } from "react";
import Produto from "@/pages/produto";
import { listarProduto } from "@/pages/api/produtoService";

interface Produto{
    produtoID: number,
    nome: string,
    preco: number,
    descricao: string,
    imagemUrl: string,
}

const ListaProduto = () => {

    const[produto, setProduto] = useState<Produto[]>([]);

    async function listar() {
        try{
            const lista = await listarProduto();
            setProduto(lista)
        }
        catch(error: any){
            console.log(error.message);
        }
    }

    useEffect(() => {
        listar();
    }, [])

    return (
        <>
            <div id={styles.Container}>
                <button id={styles.Filtro}>
                    <p>Filtrar</p>
                    <img src="../imgs/vector.svg" alt="" />
                </button>
                <div id={styles.Listas}>
                    <Link className={styles.botaoLista} href="/promocoes">Todas as promoções</Link>
                    <Link className={styles.botaoLista} href="/produtos">Todos os Produtos</Link>
                </div>
            </div>
            <div id={styles.Itens}>
                {produto.length > 0 ? produto.map((item) =>
                    <CardProduto 
                    key={item.produtoID}
                    produtoID={item.produtoID}
                    titulo={item.nome}
                    descricao={item.descricao}
                    preco={item.preco}
                    imagem={item.imagemUrl}/>
                ): (
                    <p>Carregando produto...</p>
                )}
            </div>
        </>
    )
}

export default ListaProduto;