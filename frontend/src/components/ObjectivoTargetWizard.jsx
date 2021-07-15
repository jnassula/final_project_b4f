import { useState } from "react"


function DefinirObjetivo({ objetivo, setObjetivo, handleSubmit }) {

    return (
        <div>
            <button onClick={() => console.log(objetivo)}> Console log </button>
            <h1> Define o teu objetivo</h1>
            <form onSubmit={handleSubmit}>
                <input value={objetivo} onChange={e => setObjetivo(e.target.value)} />
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}


function DefinirValor({ valor, setValor, handleSubmit }) {
    return (
        <div>
            <button onClick={() => console.log(valor)}> Console log </button>
            <h1> Define quanto queres juntar para o teu objetivo</h1>
            <form onSubmit={handleSubmit}>
                <input type="number" value={valor} onChange={e => setValor(e.target.value)} />
                <button type="submit">
                    Submit
                </button>
            </form>

        </div>
    )
}

function DefinirData({ objetivo, valor, setData, data }) {

    function dadosBackend(event) {
        event.preventDefault();
        const dadosFinais = {
            obetivo: objetivo,
            valor: valor,
            data: data
        }
        console.log(dadosFinais)

    }


    //     // Vamos enviar o obj dadosFinais com o GET e a resposta que temos são os cálculos
    //     // {valorDiário: X
    //      valorSemanal: y
    //      valorMensal: z
    //      }
    //      O utilizador escolhe e essa escolha é enviada ao backend (POST) com a opção escolhida. 
    //      Nós gravamos o objetivo, com: 
    //      {descricao, frequencia, valorDaFrequencia, valorTotal, valorContribuido(começa a zero)}

    return (
        <div>
            <button onClick={() => console.log(data)}> Console log </button>
            <h1> Define a data do teu objetivo</h1>
            <form onSubmit={dadosBackend}>
                <input type="date" value={data} onChange={e => setData(e.target.value)} />
                <button type="submit">
                    Submit
                </button>
            </form>

        </div>
    )
}



function ObjetivoTargetWizard() {
    const [objetivo, setObjetivo] = useState("")
    const [valor, setValor] = useState(0)
    const [data, setData] = useState(new Date())
    const [ecra, setEcra] = useState(0)

    function mudarEcra() {
        setEcra(ecra => ecra + 1)
    }

    function handleSubmit(event) {
        event.preventDefault();
        mudarEcra();
    }

    if (ecra === 0) {
        return <DefinirObjetivo setObjetivo={setObjetivo} objetivo={objetivo} handleSubmit={handleSubmit} />
    } else if (ecra === 1) {
        return <DefinirValor setValor={setValor} valor={valor} handleSubmit={handleSubmit} />
    } else if (ecra === 2) {
        return <DefinirData objetivo={objetivo} valor={valor} setData={setData} data={data} handleSubmit={handleSubmit} />
    }
}

export default ObjetivoTargetWizard


