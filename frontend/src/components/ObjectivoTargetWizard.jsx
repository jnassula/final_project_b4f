import { useEffect, useState } from "react"
import { useHistory } from 'react-router';
import LoadingScreen from "./LoadingScreen";
import styles from '../styles/ObjectivoTargetWizard.module.css'



//      O utilizador escolhe e essa escolha é enviada ao backend (POST) com a opção escolhida. 
//      Nós gravamos o objetivo, com: 
//      {descricao, frequencia, valorDaFrequencia, valorTotal, valorContribuido(começa a zero)}

function DefinirObjetivo({ objetivo, setObjetivo, handleSubmit }) {

    return (
        <div className={styles.wizardMain}>
            <h1> Defina o seu objetivo</h1>
            <div className={styles.wizardForm}>
              <form onSubmit={handleSubmit}>
                <input required value={objetivo} onChange={e => setObjetivo(e.target.value)} />
                <button className={styles.btnObj} type="submit">
                    Submit
                </button>
             </form>  
            </div>
            
        </div>
    )
}


function DefinirValor({ valor, setValor, handleSubmit }) {
    return (
        <div className={styles.wizardMain}>
            <h1>Defina quanto quer juntar para o seu objetivo</h1>
            <div className={styles.wizardForm}>
                    <form onSubmit={handleSubmit}>
                    <input type="number" value={valor} onChange={e => setValor(e.target.value)} />
                    <button type="submit">
                        Submit
                    </button>
                </form>
            </div>
            

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
        <div className={styles.wizardMain}>
            <h1>Defina a data do seu objetivo</h1>
            <div className={styles.wizardForm}>
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
            
        </div>
    )
}


function EscolhaOpçoes({ valor, data, objetivo, opcoes, escolhasUtilizador, setEscolhasUtilizador }) {

    const [loading, setLoading] = useState(true);
    const [opcaoFinal, setOpcaoFinal] = useState("");
    const history = useHistory();

    function voltarObjetivo(){
        history.push("objetivo")
    }
//
    function tratarObjetivo() {
        if (opcaoFinal === "diario") {
            return {
                valorAtingir: valor,
                prazo: data,
                objetivo: objetivo,
                valorContribuicoes: escolhasUtilizador.valorDiario,
                qtdContribuicoes: escolhasUtilizador.dias,
                frequenciaContribuicoes: opcaoFinal
            }
        } else if (opcaoFinal === "semanal") {
            return {
                valorAtingir: valor,
                prazo: data,
                objetivo: objetivo,
                valorContribuicoes: escolhasUtilizador.valorSemanal,
                qtdContribuicoes: escolhasUtilizador.semanas,
                frequenciaContribuicoes: opcaoFinal
            }
        } else if (opcaoFinal === "mensal") {
            return {
                valorAtingir: valor,
                prazo: data,
                objetivo: objetivo,
                valorContribuicoes: escolhasUtilizador.valorMensal,
                qtdContribuicoes: escolhasUtilizador.meses,
                frequenciaContribuicoes: opcaoFinal
            }
        }
    }

    async function fetchEscolhas() {
        try {
            const res = await fetch("/objetivos/wizard", {
                method: "POST",
                body: JSON.stringify(opcoes),
                headers: { "Content-type": "application/json" }
            })
            const json = await res.json()
            setEscolhasUtilizador(json)
            setLoading(false)
        } catch (err) {
            console.log(err)
        }
    }

    async function criarObjetivo(event) {
        event.preventDefault();
        const objetivoFinal = tratarObjetivo();
        console.log(objetivoFinal)
        console.log("criarObjetivo a funcionar")
        try {
            const res = await fetch("/objetivos", {
                method: "POST",
                body: JSON.stringify(objetivoFinal),
                headers: { "Content-type": "application/json" }
            })
            const json = await res.json();
            console.log(json)
            voltarObjetivo();
        } catch (err) {
            console.log("Por favor introduza uma data válida")
        }
    }

    useEffect(() => {
        fetchEscolhas();
    }, [])

    function consoleLog() {
        console.log(escolhasUtilizador)
        console.log(opcaoFinal)
    }

    if (loading) {
        return <LoadingScreen />
    } else if (escolhasUtilizador && escolhasUtilizador.valorMensal) {
        // console.log(escolhasUtilizador)
        return (
            <div className={styles.wizardMain}>
                <h1> Escolhe a sua opção: </h1>
                <div className={styles.wizardForm}>
                    <form onSubmit={(e) => criarObjetivo(e)}>
                        <input type="radio" name="escolha" onClick={() => setOpcaoFinal("diario")} value={escolhasUtilizador.valorDiario} /> Prefere poupar {escolhasUtilizador.valorDiario} euros durante {escolhasUtilizador.dias} dias ? <br />
                        <input type="radio" name="escolha" onClick={() => setOpcaoFinal("semanal")} value={escolhasUtilizador.valorSemanal} /> Prefere poupar {escolhasUtilizador.valorSemanal} euros durante {escolhasUtilizador.semanas} semanas ? <br />
                        <input type="radio" name="escolha" onClick={() => setOpcaoFinal("mensal")} value={escolhasUtilizador.valorMensal} /> Prefere poupar {escolhasUtilizador.valorMensal} euros durante {escolhasUtilizador.meses} {escolhasUtilizador.meses > 1 ? "meses" : "mês"} ?
                        <button type="submit">Finalizar</button>
                    </form>
                </div>
                

            </div>
        )
    } else if (escolhasUtilizador && escolhasUtilizador.valorSemanal) {
        return (
            <div className={styles.wizardMain}>
                <h1> Escolhe a sua opção: </h1>
                <div className={styles.wizardForm}>
                    <form onSubmit={(e) => criarObjetivo(e)}>
                        <input type="radio" name="escolha" onClick={() => setOpcaoFinal("diario")} value={escolhasUtilizador.valorDiario} /> Prefere poupar {escolhasUtilizador.valorDiario} euros durante {escolhasUtilizador.dias} dias ?<br />
                        <input type="radio" name="escolha" onClick={() => setOpcaoFinal("semanal")} value={escolhasUtilizador.valorSemanal} /> Prefere poupar {escolhasUtilizador.valorSemanal} euros durante {escolhasUtilizador.semanas} {escolhasUtilizador.semanas > 1 ? "semanas" : "semana"}?
                        <button type="submit">Finalizar</button>
                    </form>
                </div>
                
            </div>
        )
    } else return (
        <div className={styles.wizardMain}>
            <h1> A melhor maneira de poupar para o seu objetivo é: </h1>
            <div className={styles.wizardForm}>
                <form onSubmit={(e) => criarObjetivo(e)}>
                    <input type="radio" name="escolha" onClick={() => setOpcaoFinal("diario")} value={escolhasUtilizador.valorDiario} /> Poupar {escolhasUtilizador.valorDiario} euros durante {escolhasUtilizador.dias} {escolhasUtilizador.dias > 1 ? "dias" : "dia"}.
                    <button type="submit">Finalizar</button>
                </form>
            </div>
            
            
        </div>
    )
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
        return <EscolhaOpçoes valor={valor} data={data} objetivo={objetivo} opcoes={opcoes} escolhasUtilizador={escolhasUtilizador} setEscolhasUtilizador={setEscolhasUtilizador} />
    }
}

export default ObjetivoTargetWizard


