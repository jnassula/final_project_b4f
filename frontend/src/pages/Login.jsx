import { useState, useEffect } from 'react'
import { useHistory, useLocation } from "react-router-dom";
import styles from "../styles/Login.module.css";
import * as BiIcons from "react-icons/bi";
import * as FiIcons from "react-icons/fi";


function Login() {

    const [displaySaldo, setDisplaySaldo] = useState({ value: 0 })
    const [displayMeta, setDisplayMeta] = useState({ value: 0 })
    const [displayUltimo, setDisplayUltimo] = useState({ value: 0 })
    const [displayPoupanca, setDisplayPoupanca] = useState({ value: 0 })

    const location = useLocation();
    const history = useHistory();

    function mudarCaminho(string) {
        const { pathname } = location;
        console.log(pathname)
        const newPath = pathname.replace(pathname, string)
        return `/${newPath}`
    }

    function irObjetivos() {
        history.push(mudarCaminho("objetivo"))
    }

    function irCompras() {
        history.push(mudarCaminho("lista"))
    }

    function irCarteira() {
        history.push(mudarCaminho("saldo"))
    }

    async function fetchSaldo() {
        const res = await fetch("/saldo")
        const resBody = await res.json();
        console.log(resBody)
        setDisplaySaldo(resBody.carteira)
    }

    // async function fetchMeta() {
    //     const res = await fetch("/objetivo")
    //     const resBody = await res.json();
    //     console.log(resBody)
    //     setDisplayMeta(resBody.objetivo)
    // }

    async function fetchUltimo() {
        const res = await fetch("/saldo")
        const resBody = await res.json();
        setDisplayUltimo(resBody.carteira)
    }

    // async function fetchPoupanca() {
    //     const res = await fetch("/objetivo")
    //     const resBody = await res.json();
    //     setDisplayPoupanca(resBody.objetivo)
    // }

    useEffect(() => fetchSaldo(), [])
    // useEffect(() => fetchMeta(), [])
    useEffect(() => fetchUltimo(), [])
    // useEffect(() => fetchPoupanca(), [])

    return (
        <>
            <div className={styles.telaInicial}>
                <div className={styles.logo}>
                    <img src="../docs/imagens/big_logo_ss.png" />
                </div>
                <div className={styles.content}>
                    <h1> Olá Jonata,</h1>
                    <div className={styles.card}>
                        <p className={styles.saldo}>
                            {
                                `${displaySaldo.value}€`
                            }
                            <div className={styles.iconCard}><BiIcons.BiEuro /></div></p>
                        <p className={styles.ultimo}>
                            {
                                `${displayUltimo.value}€`
                            }
                            <div className={styles.iconCard}><BiIcons.BiSelectMultiple /></div></p>
                        <p className={styles.meta}>
                            {
                                `${displayMeta.value}€`
                            }
                            <div className={styles.iconCard}><BiIcons.BiTrophy /></div></p>
                        <p className={styles.poupanca}>
                            {

                                `${displayPoupanca.value}%`

                            }
                            <div className={styles.iconCard}><BiIcons.BiLineChart /></div></p>

                    </div>
                    <div className={styles.buttons}>
                        <button onClick={irCarteira}>
                            {/* <div className={styles.iconButtons}><BiIcons.BiWallet /></div> */}
                            <BiIcons.BiWallet size="30px" />
                        </button><br />
                        <button onClick={irObjetivos}>
                            <FiIcons.FiTarget size="30px" />
                        </button> <br />
                        <button onClick={irCompras}>
                            <BiIcons.BiListCheck size="30px" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login