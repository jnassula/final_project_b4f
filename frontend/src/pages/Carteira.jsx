import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Carteira.module.css';
// Teste


function Carteira() {
    
    const [saldoEmCarteira, setSaldoemCarteira] = useState([]);

    async function fetchSaldo() {
        const res = await fetch("/saldo")
        const resBody = await res.json();
        setSaldoemCarteira(resBody.saldos)
    };

    useEffect(() => { fetchSaldo() }, [])


    return (
        <div className="Carteira">
            <div className={styles.saldo}>
                <p>
                    Saldo total
                </p>
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
                        <img src="../docs/imagens/money.png" alt="icon money" />
                        Adicionar
                    </button> 
                </div>
                
            </div>
            
            {
                saldoEmCarteira?.map(saldo => (
                    <li key={saldo._id}>
                        <Link to={`/saldo/${saldo._id}`}>
                            {`${saldo.Valor}`}
                        </Link>
                        
                    </li>

                ))
            }
            
        </div>
    )
}


export default Carteira;