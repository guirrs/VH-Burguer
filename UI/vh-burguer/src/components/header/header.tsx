import Link from "next/link";
import styles from "./header.module.css"

const Header = () => {
    return (
        <>
            <header id={styles.header}>
                <div className={`${styles.container} layout_guide`}>
                    <img src="../imgs/Logo_VH_Burguer.svg" alt="Logo di VH Burguer que contém como plano de fundo um hamburguer." id={styles.logo}/>

                    <nav id={styles.nav_menu}>
                        <a href="">Destaque</a>
                        <a href="">Cardápio</a>
                        <a href="">Unidades</a>
                        <Link href="/login">Login</Link>
                    </nav>
                    <button id={styles.btn_icon}>
                        <img src="../imgs/icon_hamburguer.svg" alt="Ícone que representa um hamburguer para acessar o menu lateral." />
                    </button>
                </div>
            </header>
        </>
    )
}

export default Header;