import express from 'express'
import createList from '../services/lista'
// IMPORTAR TODAS AS FUNCIONALIDADES DO SERVICES/LISTA


const listaRouter = express.Router()

listaRouter.get("/", async (req,res) => {
    try{
        res.status(200).send("Camada router a bombar")
    }catch(err){
        console.log(err)
    }
})



listaRouter.post("/", async (req,res) => {
    try{
        const nomeDalista = await createList(req.body)
        res.status(200).json(nomeDalista)
    }catch(err){
        console.log(err)
    }
})

export default listaRouter
