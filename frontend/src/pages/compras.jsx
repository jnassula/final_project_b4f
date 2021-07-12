import { Field } from "formik";
import { Formik } from "formik";
import { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"

function Compras() {
    // Definimos o nosso state com uma Lista de Compras que começa vazia
    const [listaDeCompras, setListas] = useState([]);
    const history = useHistory();


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
                    <Formik
                        initialValues={{ Name: "" }}
                        onSubmit={async (values, { resetForm }) => {
                            const res = await fetch("/lista", {
                                method: "POST",
                                body: JSON.stringify(values),
                                headers: { "Content-type": "application/json" }
                            })
                            if (res.status === 201) {
                                console.log("o pedido resultou")
                                const idLista = await res.json()
                                history.push(`/lista/${idLista.id}`)
                                // resetForm()
                                // fetchListas()

                            }
                        }}
                    >
                        {
                            ({ handleSubmit }) => (
                                <form onSubmit={handleSubmit}>
                                    <Field name="Name" required />
                                    <button type="submit">Criar Lista</button>
                                </form>
                            )
                        }
                    </Formik>
                }
            </div>

        )
        // Se ainda não existir nada na nossa listaDeCompras, retornamos uma página só com o forumlário para criar uma lista
    } else return (
        <div>
            <h1>Não tem compras planeadas</h1>
            <Formik
                initialValues={{ Name: "" }}
                onSubmit={async (values, { resetForm }) => {
                    const res = await fetch("/lista", {
                        method: "POST",
                        body: JSON.stringify(values),
                        headers: { "Content-type": "application/json" }
                    })
                    if (res.status === 201) {
                        console.log("o pedido resultou")
                        const idLista = await res.json()
                        history.push(`/lista/${idLista.id}`)
                        resetForm()
                        fetchListas()
                    }
                }}
            >

                {
                    ({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <Field name="Name" required />
                            <button type="submit">Criar Lista</button>
                        </form>
                    )
                }
            </Formik>
        </div>
    )
}

export default Compras