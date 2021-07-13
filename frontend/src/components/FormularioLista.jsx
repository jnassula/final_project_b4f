import { Field } from "formik"
import { Formik } from "formik"
import { useHistory } from "react-router";
import styles from "../styles/FormularioLista.module.css";

function FormularioLista() {
    const history = useHistory()
    return (
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
    )

}

export default FormularioLista