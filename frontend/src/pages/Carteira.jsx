import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'



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
            <h1>
                Saldo
            </h1>
            {
                saldoEmCarteira?.map(saldo => (
                    <li key={saldo._id}>
                        <Link to={`/saldo/${saldo._id}`}>
                            {`${saldo.Valor}`}
                        </Link>
                        
                    </li>

                ))
            }
            <button 
                onClick={async () =>{
                    const res = await fetch(`/saldo`, {
                        method: 'POST'
                    })
                    if (res.status === 200) {
                        fetchSaldo()
                    }
                }}>
                    Adicionar
            </button>
        </div>
    )
}


export default Carteira;