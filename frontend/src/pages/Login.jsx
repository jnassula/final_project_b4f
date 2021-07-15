import { useHistory, useLocation } from "react-router-dom";
import styles from "../styles/Login.module.css";


function Login(){

    const location = useLocation();
    const history = useHistory();

    function mudarCaminho(string){
        const {pathname} = location
        const newPath = pathname.concat(string)
        return newPath
    }

    function irObjetivos(){
        history.push(mudarCaminho("objetivo"))
    }

    function irCompras(){
        history.push(mudarCaminho("lista"))
    }

    function irCarteira(){
        history.push(mudarCaminho("saldo"))
    }



    return (
        <>
            <div className={styles.telaInicial}>
                <div className={styles.logo}>
                    <img src="../docs/imagens/logo_transparent.png" /> 
                </div>
                <div className={styles.content}>
                    <h1> Olá Jonata,</h1>
                    <div className={styles.card}>
                        <p className={styles.saldo}>saldo</p>
                        <p className={styles.ultimo}>ultimo</p>
                        <p className={styles.meta}>meta</p>
                        <p className={styles.poupança}>poupança</p>
                    </div>
                    <div className={styles.buttons}>
                        <button onClick={irCarteira}> 
                            <img src="../docs/imagens/wallet.png" alt="icon carteira" />
                        </button> <br/>
                        <button onClick={irObjetivos}>
                            <img src="../docs/imagens/goal.png" alt="icon objetivos" />
                            </button> <br/>
                        <button onClick={irCompras}>
                            <img src="../docs/imagens/clipboard.png" alt="icon compras" />
                        </button>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default Login