import Footer from "@/components/footer/footer";
import SubHeader from "@/components/sub-header/sub-header";
import styles from "./categoria.module.css"
import React, { useState } from "react";
import { cadastrarCategoria } from "../api/categoriaService";
import {ToastContainer, toast} from "react-toastify"

const CriarCategoria = () => {
    const [categoria, setCategoria] = useState<string>("");

    const notificacao = (msg: string) => toast.success(msg);
    const erro = (msg: string) => toast.error(msg);

    async function cadastrar(c: React.FormEvent<HTMLFormElement>) {
        c.preventDefault();
        try{
            await cadastrarCategoria(categoria);
            notificacao("Cadastro realizadao com sucesso.");
        }
        //eslint-disable-next-line
        catch(error: any)
        {
            erro(error.message);
        }
    }

    return (
        <>
        <ToastContainer />
            <SubHeader />
            <section id={styles.container}>
                <h3>CRIAR CATEGORIA</h3>
                <form onSubmit={cadastrar} className={`${styles.info}`} >
                    <label>Nome categoria</label>
                    <input type="text" placeholder="Premium" value={categoria}
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