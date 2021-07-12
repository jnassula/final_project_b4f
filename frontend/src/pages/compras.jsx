import { Field } from "formik";
import { Formik } from "formik";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import FormularioLista from "../components/formularioLista";

function Compras() {
    // Definimos o nosso state com uma Lista de Compras que começa vazia
    const [listaDeCompras, setListas] = useState([]);


    // Esta função vai fazer um fetch (get/lista) ao backend para mostrar as listas que já temos
    // vai fazer update ao State com o resultado que vem do backend
    async function fetchListas() {
        const res = await fetch("/lista")
        const resBody = await res.json();
        setListas(resBody.listas)
    };

    // async function deleteListas(id){
    //     // A passar correctamente o id
    //     try{
    //         const corpo = JSON.stringify(id)
    //         console.log(corpo)
    //         const res = await fetch("/lista", {
    //             method: "DELETE",
    //             body: JSON.stringify(id),
    //             headers: { "Content-Type": "application/json" }
    //         }, console.log(corpo))
    //         .then(res => res.json())
    //         .then(res => setListas(res.listas))
    //     }catch(err){
    //         console.log(err)
    //     }
    // }


    // Assim que o componente é montado corremos o fetchListas
    useEffect(() => { fetchListas() }, [])


    // Se tivermos alguma coisa na nossa listaDeCompras (que é um array), vamos mostrá-la
    if (listaDeCompras.length !== 0) {
        return (
            <div>
                <h1>Tem estas compras planeadas</h1>
                {
                    listaDeCompras?.map(lista => (
                        <li key={lista._id}>
                            <Link to={`/lista/${lista._id}`}>
                                {`${lista.Name}   `}
                            </Link>
                            <button
                                onClick={async () => {
                                    const res = await fetch(`/lista/${lista._id}`, {
                                        method: "DELETE"
                                    })
                                    if (res.status === 200) {
                                        console.log("Lista eliminada com sucesso");
                                        fetchListas()
                                    }
                                }}>
                                Eliminar lista
                            </button>
                        </li>
                    ))
                }
                {
                    < FormularioLista />
                }
            </div>

        )
        // Se ainda não existir nada na nossa listaDeCompras, retornamos uma página só com o forumlário para criar uma lista
    } else return (
        <div>
            <h1>Não tem compras planeadas</h1>
            < FormularioLista />
        </div>
    )
}

export default Compras