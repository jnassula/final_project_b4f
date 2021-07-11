import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Compras() {
    // Definimos o nosso state com uma Lista de Compras que começa vazia
    const [listaDeCompras, setListas] = useState([])


    // Esta função vai fazer um fetch (get/lista) ao backend para mostrar as listas que já temos
    // vai fazer update ao State com o resultado que vem do backend
    async function fetchListas() {
        const res = await fetch("/lista")
        const resBody = await res.json();
        setListas(resBody.listas)
    };


    // Assim que o componente é montado corremos o fetchListas
    useEffect(() => { fetchListas() }, [])


    // Se tivermos alguma coisa na nossa listaDeCompras (que é um array), vamos mostrá-la
    if (listaDeCompras.length !== 0) {
        return (
            <div>
                <h1>Lista de Compras</h1>

                {
                    listaDeCompras?.map(lista => (
                        <li
                            key={lista._id}
                            onClick={() => console.log(`Aceder à lista ${lista._id}`)}
                        >
                            <Link to={`/lista/${lista._id}`}>
                                {lista.Name}
                            </Link>
                        </li>
                    ))
                }

                <button onClick={fetchListas}>Criar lista de compras</button>
            </div>

        )
    // Se ainda não existir nada na nossa listaDeCompras, retornamos uma página só com o forumlário para criar uma lista
    } else return (
        <div>
            <h1>Não tem compras planeadas</h1>
            <button onClick={() => console.log(`Criar lista de compras nova`)}>Criar lista de compras</button>
        </div>
    )
}

export default Compras