import styles from "./footer.module.css"

const Footer = () => {
    return (
        <>
            <footer id={styles.footer}>
                <section id={styles.container}>
                    <img src="./imgs/Logo_footer.svg" alt="" id={styles.logo_footer}/>
                    <nav>
                        <img src="../imgs/youtube.png" alt="" />
                        <img src="../imgs/tiktok.png" alt="" />
                        <img src="../imgs/insta.png" alt="" />
                        <img src="../imgs/face.png" alt="" />
                    </nav>
                </section>
                <hr id={styles.linha_decorativa}></hr>
                <a id={styles.copyright}>Copyright © 2025 VH Burguer | Todos os direitos reservados</a>
            </footer>
        </>
    )
}

export default Footer