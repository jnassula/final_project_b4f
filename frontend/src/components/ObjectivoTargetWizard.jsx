import { useState } from "react"

//     // Vamos enviar o obj dadosFinais com o GET e a resposta que temos são os cálculos
//     // {valorDiário: X
//      valorSemanal: y
//      valorMensal: z
//      }
//      O utilizador escolhe e essa escolha é enviada ao backend (POST) com a opção escolhida. 
//      Nós gravamos o objetivo, com: 
//      {descricao, frequencia, valorDaFrequencia, valorTotal, valorContribuido(começa a zero)}

function DefinirObjetivo({ objetivo, setObjetivo, handleSubmit }) {

    return (
        <div>
            <button onClick={() => console.log(objetivo)}> Console log </button>
            <h1> Define o teu objetivo</h1>
            <form onSubmit={handleSubmit}>
                <input required value={objetivo} onChange={e => setObjetivo(e.target.value)} />
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


function DefinirData({ data, setData, handleSubmit, setOpcoes, objetivo, valor }) {

    function definirOpcoes(dataUtilizador) {
        setOpcoes({
            objetivo: objetivo,
            valor: valor,
            data: dataUtilizador
        })
    }

    return (
        <div>
            <button onClick={() => console.log(data)}> Console log </button>
            <h1> Define a data do teu objetivo</h1>
            <form onSubmit={handleSubmit}>
                <input type="date" value={data} onChange={e => {
                    setData(e.target.value);
                    definirOpcoes(e.target.value);
                }} />
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}


function EscolhaOpçoes({ opcoes, escolhasUtilizador, setEscolhasUtilizador }) {

    async function fetchEscolhas() {
        try {
            const res = await fetch("/objetivos/wizard", {
                method: "POST",
                body: JSON.stringify(opcoes),
                headers: { "Content-type": "application/json" }
            })
            const json = await res.json()
            setEscolhasUtilizador(json)
        } catch (err) {
            console.log(err)
        }
    }

    function consoleLog() {
        fetchEscolhas();
        console.log(escolhasUtilizador)
    }

    if (escolhasUtilizador && escolhasUtilizador.valorMensal) {
        return (
            <div>
                <h1> Escolhe a tua opção: </h1>
                <p>{escolhasUtilizador.valorDiario}</p>
                <p>{escolhasUtilizador.valorSemanal}</p>
                <p>{escolhasUtilizador.valorMensal}</p>
                <button onClick={() => consoleLog()}>consolelog</button>
            </div>
        )
    } else return <button onClick={() => consoleLog()}>consolelog</button>
}




function ObjetivoTargetWizard() {
    const [objetivo, setObjetivo] = useState("")
    const [valor, setValor] = useState(0)
    const [data, setData] = useState(new Date())
    const [ecra, setEcra] = useState(0)
    const [opcoes, setOpcoes] = useState({
        valor: 0,
        data: new Date(),
        objetivo: ""
    })
    const [escolhasUtilizador, setEscolhasUtilizador] = useState()

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
        return <DefinirData setData={setData} opcoes={opcoes} setOpcoes={setOpcoes} data={data} objetivo={objetivo} valor={valor} handleSubmit={handleSubmit} />
    } else if (ecra === 3) {
        return <EscolhaOpçoes opcoes={opcoes} escolhasUtilizador={escolhasUtilizador} setEscolhasUtilizador={setEscolhasUtilizador} />
    }
}

export default ObjetivoTargetWizard


