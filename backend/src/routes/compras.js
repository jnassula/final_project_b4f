import express from 'express'
import {createList, displayLists, eraseList} from '../services/compras'
// IMPORTAR TODAS AS FUNCIONALIDADES DO SERVICES/LISTA


const listaRouter = express.Router()


// GET /lista - Retorna todas as listas de compras
listaRouter.get("/", async (req,res) => {
    try{
        res.status(200).json({
            listas: await displayLists()
        })
    }catch(err){
        console.log(err)
    }
})


// POST /lista - Recebe um Json com o nome da lista e gera um ID
listaRouter.post("/", async (req,res) => {
    try{
        const idDaLista = await createList(req.body)
        // console.log(idDaLista)
        res.status(201).json({
            Nome: req.body.Name,
            id: idDaLista
        });
    }catch(err){
        console.log(err)
    }
})

// NOTA: A FAZER DELETE PELO NOME, NÃO PELO ID
listaRouter.delete("/", async (req, res) => {
    try{
        const idARemover = await eraseList(req.body)
        console.log(idARemover)
        res.status(200).json(idARemover)
    }catch(err){
        console.log(err)
    }
})

export default listaRouter
