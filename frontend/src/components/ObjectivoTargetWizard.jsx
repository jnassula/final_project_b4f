import { Field } from "formik"
import { Formik } from "formik"
import { useState } from "react"


function ObjetivoTargetWizard() {
    const [objetivo, setObjetivo] = useState("")
    const [valor, setValor] = useState(0)
    const [data, setData] = useState()
    const [ecra, setEcra] = useState(0)

    function mudarEcra() {
        setEcra(ecra => ecra + 1)
    }


    function DefinirObjetivo({ setObjetivo }) {
        return (
            <div>
                <button onClick={() => console.log(objetivo)}> Console log </button>
                <h1> Define o teu objetivo</h1>
                <form/>
                <Formik
                    initialValues={{ obj: "" }}
                    onSubmit={(objetivoUtilizador) => {
                        (setObjetivo(objetivoUtilizador))
                        mudarEcra()
                    }}
                >
                    {
                        ({ handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <Field name="obj" type="text" placeholder="Defina aqui o seu objetivo" required />
                                <button type="submit">Próximo passo</button>
                            </form>
                        )
                    }
                </Formik>
            </div>
        )
    }


    function DefinirValor({ setValor }) {
        return (
            <div>
                <button onClick={() => console.log(valor)}> Console log </button>
                <h1> Define quanto queres juntar para o teu objetivo</h1>
                <Formik
                    initialValues={{valor: 0}}
                    onSubmit={(valorUtilizador) => {
                        (setValor(valorUtilizador))
                        
                    }}
                >
                    {
                        ({ handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <Field name="valor" type="number" placeholder="Defina aqui o valor" required />
                                <button type="submit">Próximo passo</button>
                            </form>
                        )
                    }
                </Formik>
            </div>
        )
    }



    function DefinirData({ setData }) {
        return (
            <div>
                <h1> Define a data</h1>
                <button onClick={() => mudarEcra()}>Próximo passo</button>
            </div>
        )
    }


    if (ecra === 0) {
        return <DefinirObjetivo setObjetivo={setObjetivo} />
    } else if (ecra === 1) {
        return <DefinirValor setValor={setValor} />
    } else if (ecra === 2) {
        return <DefinirData setData={setData} />
    }
}

export default ObjetivoTargetWizard


