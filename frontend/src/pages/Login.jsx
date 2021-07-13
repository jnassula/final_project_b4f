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
                
                <h1> Olá Sr. Poupadinho</h1>
                <div className={styles.card}>
                    <p className={styles.saldo}>saldo</p>
                    <p className={styles.ultimo}>ultimo</p>
                    <p className={styles.meta}>meta</p>
                    <p className={styles.poupança}>poupança</p>
                </div>
                <div className={styles.buttons}>
                    <button onClick={irCarteira}>Vá para Carteira</button> <br/>
                    <button onClick={irObjetivos}>Vá para os objectivos</button> <br/>
                    <button onClick={irCompras}>Vá para as suas compras</button>
                </div>
            </div>
        </>
    )
}

export default Login