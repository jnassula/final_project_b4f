import { useHistory, useLocation } from "react-router-dom";
import styles from "../styles/Login.module.css";
import * as BiIcons from "react-icons/bi";
import * as FiIcons from "react-icons/fi";


function Login(){

    const location = useLocation();
    const history = useHistory();

    function mudarCaminho(string){
        const {pathname} = location;
        console.log(pathname)
        const newPath = pathname.replace(pathname, string)
       return `/${newPath}` 
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
                <img src="../docs/imagens/big_logo_ss.png" />
                </div>
                <div className={styles.content}>
                    <h1> Olá Jonata,</h1>
                    <div className={styles.card}>
                        <p className={styles.saldo}>3000,57€<div className={styles.iconCard}><BiIcons.BiEuro/></div></p>
                        <p className={styles.ultimo}>+20,45€<div className={styles.iconCard}><BiIcons.BiSelectMultiple/></div></p>
                        <p className={styles.meta}>1000,00€<div className={styles.iconCard}><BiIcons.BiTrophy/></div></p>
                        <p className={styles.poupanca}>278,90€<div className={styles.iconCard}><BiIcons.BiLineChart/></div></p>
                    </div>
                    <div className={styles.buttons}>
                        <button onClick={irCarteira}> 
                            {/* <div className={styles.iconButtons}><BiIcons.BiWallet /></div> */}
                            <BiIcons.BiWallet size="30px" />
                        </button><br/>
                        <button onClick={irObjetivos}>
                            <FiIcons.FiTarget size="30px" />
                            </button> <br/>
                        <button onClick={irCompras}>
                            <BiIcons.BiListCheck size="30px"/>
                        </button>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default Login