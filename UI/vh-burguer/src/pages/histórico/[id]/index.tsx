import Footer from "@/components/footer/footer"
import SubHeader from "@/components/sub-header/sub-header"
import styles from "./historico.module.css"
import DataRow from "@/components/data-row"
import { useEffect, useState } from "react"
import { erro } from "@/utils/toast"
import { listarPorIdDoProduto } from "@/pages/api/logProdutoService"
import { useParams } from "next/navigation"

type HistoricoAlteracao = {
    logID: number,
    dataAlteracao:string,
    nomeAnterior: string,
    precoAnterior: number;
}

const Historico = () => {

    const[historico, setHistorico] = useState<HistoricoAlteracao[] | null>(null);

    const params = useParams()
    const id = params?.id;

    async function listarHistorico() {
        try{
            const lista = await listarPorIdDoProduto(Number(id));
            setHistorico(lista);
        }catch(error: any){
            erro(error.message)
        }
    }

    useEffect(() => {
        if(!id) return;

        setTimeout(() => {
            listarHistorico();
        }, 1000);
    }, [id]);

    return (
        <>
        <SubHeader />
        <main className={styles.main_historico}>
            <section className={styles.container_historico}>
                <h1>Histórico de alterações</h1>
                {historico === null ? (<p className={styles.mensagem}>
                    Carregando histórico...
                </p>): historico.length === 0 ? (
                    <p className = {styles.mensagem}>
                        O produto não contém Histórico de alterações.
                    </p>
                ): (
                    <table className={styles.tabela_histórico}></table>
                )}
                <table>
                    <thead>
                        <th>Data da alteração</th>
                        <th>Nome anterior</th>
                        <th>Preço anterior</th>
                    </thead>
                    <tbody>
                        {historico.map((item) =>(
                            <DataRow
                            key={item.logID}
                            dataAlteracao={item.dataAlteracao}
                            nomeAnterior={item.nomeAnterior}
                            precoAnterior={item.precoAnterior}/>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
            <Footer />
        </>
    )
}