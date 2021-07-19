import { Field, Formik } from "formik"
import { useHistory } from "react-router";
import styles from "../styles/FormularioLista.module.css";
import * as BiIcons from "react-icons/bi";


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
                        <div className={styles.input}>
                            <form onSubmit={handleSubmit}>
                                <Field name="nameLista" required />
                                <button type="submit">
                                    <div className={styles.iconAdd}><BiIcons.BiListPlus /></div>
                                </button>
                            </form>
                        </div>
                        
                    )
                }
            </Formik>
        </div>
        
    )

}

export default FormularioLista