import express from "express"
import { createObjective, displayObjective, displayObjectiveById, eraseObjetive, updateObjectiveById } from "../services/objetivos"
import { differenceInCalendarDays, differenceInWeeks, differenceInMonths, parseISO } from 'date-fns'
const objetivosRouter = express.Router()

// Esta função recebe o prazo do Objetivo (já como data):
// Calcula a diferença em dias meses e dias entre o prazoObjetivo e o momento actual (em que a função acontece)
function tratarDatas(prazoEmString) {
    const agora = new Date()
    const prazoObjetivo = new Date(prazoEmString)
    const mesesRestantes = differenceInMonths(prazoObjetivo, agora)
    const semanasRestantes = differenceInWeeks(prazoObjetivo, agora)
    const diasRestantes = differenceInCalendarDays(prazoObjetivo, agora)

    return ({ mesesRestantes: mesesRestantes, semanasRestantes: semanasRestantes, diasRestantes: diasRestantes })
}

// Se existir valorDiario, vai retornar o valor a contribuir diariamente, e a mesma coisa para o valorSemanal e o valorMensal
function escolhasUtilizador(tempoRestante, valor) {
    // A REVER
    const valorDiario = Math.floor(valor / tempoRestante.diasRestantes)
    const valorSemanal = Math.floor(valor / tempoRestante.semanasRestantes)
    const valorMensal = Math.floor(valor / tempoRestante.mesesRestantes)

    if (tempoRestante.mesesRestantes === 0 && tempoRestante.semanasRestantes === 0) {
        return { valorDiario: valorDiario, dias: tempoRestante.diasRestantes }
    } else if (tempoRestante.mesesRestantes === 0) {
        return { valorSemanal: valorSemanal, semanas: tempoRestante.semanasRestantes, valorDiario: valorDiario, dias: tempoRestante.diasRestantes }
    } else return { valorMensal: valorMensal, meses: tempoRestante.mesesRestantes, valorSemanal: valorSemanal, semanas: tempoRestante.semanasRestantes, valorDiario: valorDiario, dias: tempoRestante.diasRestantes }
}


// GET /objetivos - Retorna todas os objetivos
objetivosRouter.get("/", async (req, res) => {
    try {
        res.status(200).json({
            Objetivos: await displayObjective()
        })
    } catch (err) {
        console.log(err)
    }
})


// PATCH /objetivos - Vai encontrar o objetivo por id e actualizar o valorContribuido se já existir ou então criá-lo
objetivosRouter.patch("/:id", async (req, res) => {
    const objetivoActualizar = await displayObjectiveById(req.params.id)
    console.log(objetivoActualizar)
    try {
        if (objetivoActualizar.valorContribuido && objetivoActualizar.qtdContribuicoes !== 0) {
            let valorAcrescentar = objetivoActualizar.valorContribuicoes;
            let valorFinal = valorAcrescentar + objetivoActualizar.valorContribuido;
            let contribuicoesActualizadas = objetivoActualizar.qtdContribuicoes - 1
            let objetivoActualizado = { ...objetivoActualizar, valorContribuido: valorFinal, qtdContribuicoes: contribuicoesActualizadas };
            await updateObjectiveById(objetivoActualizado);
            res.status(200).json(objetivoActualizado)
        } else if (objetivoActualizar.qtdContribuicoes === 1){
            console.log("Chegou ao seu objetivo")
            // TO DO: APAGAR O OBJETIVO E MENSAGEM DE PARABÉNS AO UTILIZADOR!
        } else {
            let valorAcrescentar = objetivoActualizar.valorContribuicoes;
            let contribuicoesActualizadas = objetivoActualizar.qtdContribuicoes - 1
            let objetivoActualizado = { ...objetivoActualizar, valorContribuido: valorAcrescentar, qtdContribuicoes: contribuicoesActualizadas };
            await updateObjectiveById(objetivoActualizado);
            res.status(200).json(objetivoActualizado)
        }
    } catch (err) {
        console.log(err)
    }
})



// POST com /wizard - Retorna as opções de objetivos
objetivosRouter.post("/wizard", async (req, res) => {
    try {
        const dataObjetivo = new Date(req.body.data)
        const objTempo = tratarDatas(dataObjetivo)
        res.status(200).json(escolhasUtilizador(objTempo, req.body.valor))
    } catch (err) {
        console.log(err)
    }
})

// POST vai criar um novo objectivo
objetivosRouter.post("/", async (req, res) => {
    try {
        const idDoObjetivo = await createObjective(req.body)

        res.status(201).json({
            Objetivo: req.body.obj,
            Prazo: req.body.prazo,
            Valor: req.body.valor,
            id: idDoObjetivo
        });
    } catch (err) {
        console.log(err)
    }
})


// DELETE vai apagar o objectivo
objetivosRouter.delete("/:id", async (req, res) => {
    try {
        const removido = await eraseObjetive(req.params.id)
        if (removido) {
            res.status(200).json()
        }
    } catch (err) {
        console.log(err)
    }
})

export default objetivosRouter