import { Formik, Field } from "formik";



function FormularioItem({addItem}) {
    return (
        <Formik
            initialValues={{ descricao: "", quantidade: "", unidade: "un" }}
            onSubmit={(values, {resetForm}) => {
                addItem(values)
                resetForm()
            }}
        >
            {
                ({ handleSubmit }) => (
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
                )
            }
        </Formik>
    )
}

export default FormularioItem