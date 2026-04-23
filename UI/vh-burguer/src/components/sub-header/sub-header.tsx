import Link from "next/link";
import styles from "./sub-header.module.css"

const SubHeader = () => {
    return (
            <header id={styles.header}>
                <div className={`${styles.container} layout_guide`}>
                    <img src="../imgs/Logo_footer.svg" alt="Logo di VH Burguer que contém como plano de fundo um hamburguer." id={styles.logo}/>

                    <nav id={styles.nav_menu}>
                        <Link href="/home">Voltar</Link>
                    </nav>
                </div>
            </header>
    )
}

export default SubHeader;