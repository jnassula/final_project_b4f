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
        console.log(req.body)
        res.status(201).json({
            Nome: req.body.Name,
            id: idDaLista
        });
    }catch(err){
        console.log(err)
    }
})


listaRouter.post("/:id", async (req, res) => {
    try{
        console.log(req.body)
        res.status(200).json(req.body)
    }catch(err){
        console.log(err)
    }
})

// DELETE /lista/:id - Recebe um json com o id e apaga
listaRouter.delete("/:id", async (req, res) => {
    try{
        const removido = await eraseList(req.params.id)
        // console.log(req.params.id)
        if (removido){
            res.status(200).json()
        }
    }catch(err){
        console.log(err)
    }
})

export default listaRouter
