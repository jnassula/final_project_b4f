import { Formik, Field } from "formik";
import styles from "../styles/FormularioItem.module.css";



function FormularioItem({addItem}) {
    return (
        <div className={styles.itemBody}>
            <Formik
                initialValues={{ descricao: "", quantidade: "", unidade: "un" }}
                onSubmit={(values, {resetForm}) => {
                    addItem(values)
                    resetForm()
                }}
            >
                {
                    ({ handleSubmit }) => (
                        <div className={styles.itemMain}>
                                <form onSubmit={handleSubmit}>
                                    <Field name="descricao" required />
                                    <Field name="quantidade" type="number" required />
                                    <Field name="unidade" as="select" required>
                                    <option value="un">Un</option>
                                    <option value="kg">Kg</option>
                                    <option value="lt">Lt</option>
                                </Field>
                                <button type="submit">Adicionar item</button>
                            </form>
                        </div>
                        
                    )
                }
            </Formik>
        </div>
        
    )
}

export default FormularioItem