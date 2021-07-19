import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Carteira.module.css';
import * as BiIcons from "react-icons/bi";
// Testee


function Carteira() {

    const [saldoEmCarteira, setSaldoemCarteira] = useState(0);
    const [adicionarValor, setAdicionar] = useState(0)

    async function fetchSaldo() {
        const res = await fetch("/saldo")
        const resBody = await res.json();
        console.log(resBody.carteira.saldo)
        setSaldoemCarteira(resBody.carteira.saldo)
    };

    async function adicionarSaldo(carteira, valor) {
        const res = await fetch("/saldo/adicionar", {
            method: "PATCH",
            body: JSON.stringify({carteira, valor}),
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
                <form onSubmit={ (adicionarValor) => adicionarSaldo(adicionarValor) }>
                    <div className={styles.add}>
                        <input 
                            type="number" 
                            name="valor" 
                            placeholder="0,00€" 
                            onChange={event => setAdicionar(event.target.value)}></input>
                        <button type="submit">
                            <BiIcons.BiPlus />
                                Adicionar
                        </button>
                    </div>
                </form>
                
            </div>
        </div>
    )
}


export default Carteira;