import express from 'express'
import createList from '../services/lista'
// IMPORTAR TODAS AS FUNCIONALIDADES DO SERVICES/LISTA


const listaRouter = express.Router()


listaRouter.post("/", async (req,res) => {
    try{
        console.log("Camada router a bombar")
        const lista = await createList()
        res.status(200).json({id: id})
    }catch(err){
        console.log(err)
    }
})

export default listaRouter
