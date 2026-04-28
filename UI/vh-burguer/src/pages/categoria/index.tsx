import Footer from "@/components/footer/footer";
import SubHeader from "@/components/sub-header/sub-header";
import styles from "./categoria.module.css"
import React, { useState } from "react";
import { cadastrarCategoria } from "../api/categoriaService";

const CriarCategoria = () => {
    const [categoria, setCategoria] = useState<string>("");

    function cadastrar(c: React.FormEvent<HTMLFormElement>) {
        c.preventDefault();
        cadastrarCategoria(categoria)
    }

    return (
        <>
            <SubHeader />
            <section id={styles.container}>
                <h3>CRIAR CATEGORIA</h3>
                <form onSubmit={cadastrar} className={`${styles.info}`} >
                    <label>Nome categoria</label>
                    <input type="text" placeholder="https://unsplash.com/pt-br/fotografias/cheseburger-de-" value={categoria}
                        onChange={(c) => setCategoria(c.target.value)} />
                    <div id={styles.botoes}>
                        <button id={styles.salvar}>Salvar</button>
                        <button id={styles.cancelar}>Cancelar</button>
                    </div>
                </form>

            </section>
            <Footer />
        </>
    )
}

export default CriarCategoria;