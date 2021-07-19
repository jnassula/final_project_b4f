import express from "express"
import { createObjective, displayObjective, displayObjectiveById, eraseObjetive, updateObjectiveById, updateObjectiveByIdFinal } from "../services/objetivos"
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

    if (prazoObjetivo < agora ){
        return null
    } else return ({ mesesRestantes: mesesRestantes, semanasRestantes: semanasRestantes, diasRestantes: diasRestantes })
}

function arredondarValor(valor, tempo){
    return (Math.floor((valor / tempo * 100)) / 100)
}

// Se existir valorDiario, vai retornar o valor a contribuir diariamente, e a mesma coisa para o valorSemanal e o valorMensal
function escolhasUtilizador(tempoRestante, valor) {
    const valorDiario = arredondarValor(valor, tempoRestante.diasRestantes)
    const valorSemanal = arredondarValor(valor, tempoRestante.semanasRestantes)
    const valorMensal = arredondarValor(valor, tempoRestante.mesesRestantes)

    if (tempoRestante.mesesRestantes === 0 && tempoRestante.semanasRestantes === 0 && tempoRestante.diasRestantes > 0) {
        return { valorDiario: valorDiario, dias: tempoRestante.diasRestantes }
    } else if (tempoRestante.mesesRestantes === 0) {
        return { valorSemanal: valorSemanal, semanas: tempoRestante.semanasRestantes, valorDiario: valorDiario, dias: tempoRestante.diasRestantes }
    } else return { valorMensal: valorMensal, meses: tempoRestante.mesesRestantes, valorSemanal: valorSemanal, semanas: tempoRestante.semanasRestantes, valorDiario: valorDiario, dias: tempoRestante.diasRestantes }
}

function actualizarObjetivo(objetivoActualizar) {
    let valorAcrescentar = objetivoActualizar.valorContribuicoes;
    let valorFinal = valorAcrescentar + objetivoActualizar.valorContribuido;
    let contribuicoesActualizadas = objetivoActualizar.qtdContribuicoes - 1
    return { ...objetivoActualizar, valorContribuido: valorFinal, qtdContribuicoes: contribuicoesActualizadas };
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

function calcularSomaObjetivos(objetivos){
    let soma = 0
    for (const objetivo of objetivos){
        soma = soma + parseInt(objetivo.valorAtingir) 
    }
    return soma
}

objetivosRouter.get("/total", async (req, res) => {
    try {
        const objetivos = await displayObjective()
            res.status(200).json({
                valorTotal: calcularSomaObjetivos(objetivos)
            })
    } catch (err) {
        console.log(err)
    }
})



// PATCH /objetivos - Vai encontrar o objetivo por id e actualizar o valorContribuido se já existir ou então criá-lo
objetivosRouter.patch("/:id", async (req, res) => {
    const objetivoActualizar = await displayObjectiveById(req.params.id)
    try {
        if (objetivoActualizar.valorContribuido && objetivoActualizar.qtdContribuicoes > 2) {
            let objetivoActualizado = actualizarObjetivo(objetivoActualizar)
            await updateObjectiveById(objetivoActualizado);
            res.status(200).json(objetivoActualizado)
        } else if (objetivoActualizar.qtdContribuicoes === 2) {
            let objetivoActualizado = actualizarObjetivo(objetivoActualizar)
            await updateObjectiveByIdFinal(objetivoActualizado);
            res.status(200).json(objetivoActualizado)
        } else if (objetivoActualizar.qtdContribuicoes === 1) {
            await eraseObjetive(req.params.id)
            res.status(202).json()
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
        // A REVER MENSAGEM DE ERRO
        const objTempo = tratarDatas(dataObjetivo)
        if (objTempo === null){
            res.status(404)
        } else res.status(200).json(escolhasUtilizador(objTempo, req.body.valor))
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