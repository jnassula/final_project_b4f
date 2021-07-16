import { useState, useEffect } from 'react'
import { useHistory, useLocation } from "react-router-dom";
import styles from "../styles/Login.module.css";


function Login(){

    const [displaySaldo, setDisplaySaldo] = useState({value: 0})
    const [displayMeta, setDisplayMeta] = useState({value: 0})
    const [displayUltimo, setDisplayUltimo] = useState({value: 0})
    const [displayPoupanca, setDisplayPoupanca] = useState({value: 0})

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

    async function fetchSaldo() {
        const res = await fetch("/saldo")
        const resBody = await res.json();
        setDisplaySaldo(resBody.carteira)
    }

    async function fetchMeta() {
        const res = await fetch("/objetivo")
        const resBody = await res.json();
        setDisplayMeta(resBody.objetivo)
    }

    async function fetchUltimo() {
        const res = await fetch("/saldo")
        const resBody = await res.json();
        setDisplayUltimo(resBody.carteira)
    }

    async function fetchPoupanca() {
        const res = await fetch("/objetivo")
        const resBody = await res.json();
        setDisplayPoupanca(resBody.objetivo)
    }

    useEffect(() => fetchSaldo(), [])
    useEffect(() => fetchMeta(), [])
    useEffect(() => fetchUltimo(), [])
    useEffect(() => fetchPoupanca(), [])

    return (
        <>
            <div className={styles.telaInicial}>
                <div className={styles.logo}>
                    <img src="../docs/imagens/logo_transparent.png" /> 
                </div>
                <div className={styles.content}>
                    <h1> Olá Jonata,</h1>
                    <div className={styles.card}>
                        <p className={styles.saldo}>
                            {
                                `${displaySaldo.value}€`
                            }
                        </p>
                        <p className={styles.ultimo}>
                            {
                                `${displayUltimo.value}€`
                            }
                        </p>
                        <p className={styles.meta}>
                            {
                                `${displayMeta.value}€`
                            }
                        </p>
                        <p className={styles.poupança}>
                            {
                                `${displayPoupanca.value}€`
                            }
                        </p>
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