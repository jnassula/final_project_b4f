import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Carteira.module.css';
import * as BiIcons from "react-icons/bi";
// Testee


function Carteira() {
    
    const [saldoEmCarteira, setSaldoemCarteira] = useState({value: 0});

    async function fetchSaldo() {
        const res = await fetch("/saldo")
        const resBody = await res.json();
        setSaldoemCarteira(resBody.carteira)
    };

    useEffect(() => { fetchSaldo() }, [])


    return (
        <div className="Carteira">
            <div className={styles.saldo}>
            <p>Saldo total</p>
                <div className={styles.valor}>
                {
                  `${saldoEmCarteira.value}€`
                }
                </div>
                <div className={styles.add}>
                   <button 
                onClick={async () =>{
                    const res = await fetch(`/saldo`, {
                        method: 'POST'
                    })
                    if (res.status === 200) {
                        fetchSaldo()
                    }
                    }}>
                        <BiIcons.BiPlus/>
                        Adicionar</button>
                </div>
                
            </div> 
            
        </div>
        

        )
}


export default Carteira;