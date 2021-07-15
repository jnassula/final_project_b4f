import { Field, Formik } from "formik"
import { useHistory } from "react-router";
import styles from "../styles/FormularioLista.module.css";

function FormularioLista() {
    const history = useHistory()
    return (
        <div className={styles.form}>   
            <Formik
                initialValues={{ nameLista: "" }}
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
                            <Field name="nameLista" required />
                            <button type="submit">
                                <img src="../docs/imagens/add.png" alt="icon add" />
                            </button>
                        </form>
                    )
                }
            </Formik>
        </div>
        
    )

}

export default FormularioLista