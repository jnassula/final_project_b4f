import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Carteira.module.css';
import * as BiIcons from "react-icons/bi";
// Testee


function Carteira() {

    const [saldoEmCarteira, setSaldoemCarteira] = useState(0);

    async function fetchSaldo() {
        const res = await fetch("/saldo")
        const resBody = await res.json();
        console.log(resBody.carteira.saldo)
        setSaldoemCarteira(resBody.carteira.saldo)
    };

    async function adicionarSaldo(valor) {
        const res = await fetch("/saldo/adicionar", {
            method: "PATCH",
            body: JSON.stringify(valor),
            headers: { "Content-type": "application/json" }
        })
        if (res.status === 200) {
            fetchSaldo();
        } else return "Falha a adicionar valor"
    }

    useEffect(() => { fetchSaldo() }, [])


    return (
        <div className="Carteira">
            <div className={styles.saldo}>
                <p>Saldo total</p>
                <div className={styles.valor}>
                    {
                        `${saldoEmCarteira}€`
                    }
                </div>
                <div className={styles.add}>
                    <button
                        onClick={(valorAdicionar) => adicionarSaldo(valorAdicionar)}>
                        {/* <img src="../docs/imagens/money.png" alt="icon money" /> */}
                        <BiIcons.BiPlus />
                        Adicionar</button>

                </div>

            </div>
        </div>

    )
}


export default Carteira;