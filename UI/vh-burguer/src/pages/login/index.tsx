import { useState } from "react";
import styles from "./login.module.css"
import { login } from "../api/authService";
import { useRouter } from "next/router";
import {ToastContainer, toast} from "react-toastify"


//ESTRUTURA PADRÃO!
const Login = () => {

    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");

    const router = useRouter();
    const notificacao = (msg: string) => toast(msg)
    const erro = (msg: string) => toast.error(msg);

async  function autenticar(e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            await login(email, senha);
            notificacao("Login bem sucedido!")

            setTimeout(() => {
                router.push("/home");
            }, 2000); // 2 segundos
        }
        // eslint-disable-next-line
        catch (error: any) {
                erro(error.message);
        }
    }

    return (
        <>
        <ToastContainer />
            <main className={styles.main}>
                <img src="../imgs/hamburguer_login.png" alt="Hambuguer" />
                <div id={styles.campo_login}>
                    <h1>Login</h1>
                    <form id={styles.formulario} onSubmit={autenticar}>
                        <div className={styles.campo_form}>
                            <label htmlFor="email">E-mail</label>
                            <input type="text" name="email" placeholder="email@exemplo.com" required 
                            //onChange faz com que cada modificacao, cada tecla digitada altere, ele armazena
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className={styles.campo_form}>
                            <label htmlFor="senha">Senha</label>
                            <input type="password" name="senha" placeholder="*******" required 
                            value={senha} onChange={(s) => setSenha(s.target.value)} />
                        </div>
                        <a id={styles.esq_senha} href="">Esqueceu sua senha?</a>
                        <button className={styles.botao}>Entrar</button>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Login;