import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Carteira.module.css';
import * as BiIcons from "react-icons/bi";



function Carteira() {

    const [saldoEmCarteira, setSaldoemCarteira] = useState({});
    const [valorAdicionar, setValorAdicionar] = useState(0)

    async function fetchSaldo() {
        const res = await fetch("/saldo")
        const resBody = await res.json();
        setSaldoemCarteira({saldo: resBody.carteira.saldo, id: resBody.carteira._id})
    };

    async function adicionarSaldo(id, valor) {
        const res = await fetch(`/saldo/${id}`, {
            method: "PATCH",
            body: JSON.stringify({id, valor}),
            headers: { "Content-type": "application/json" }
        }) 
        console.log(res.status)
        if (res.status === 200) {
            await fetchSaldo();
        } else return "Falha a adicionar valor"
    }

    useEffect(() => { fetchSaldo() }, [])

    async function handleSubmit(event){
        event.preventDefault();
        await adicionarSaldo(saldoEmCarteira.id, valorAdicionar)
    }


    return (
        <div className="Carteira">
            <div className={styles.saldo}>
                <p>Saldo total</p>
                <div className={styles.valor}>
                    {
                        `${saldoEmCarteira.saldo}€`
                    }
                </div>
                <form onSubmit={ async (event) => await handleSubmit(event) }>
                    <div className={styles.add}>
                        <input 
                            type="number" 
                            name="valor" 
                            placeholder="0,00€" 
                            value={valorAdicionar}
                            onChange={event => setValorAdicionar(event.target.value)}></input>
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