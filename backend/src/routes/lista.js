// Vamos enviar os items que a lista tem através do /lista/:id/items com um GET para mostrar os produtos
// Vamos adicionar à lista específica que acedemos (através do ID) com um POST para criar um produto (OBJECTO) e colocá-lo no array ITEMS []
// Vamos editar o item através de um PATCH

import express from 'express'
import { createItem, displayItem } from '../services/lista'

const listaItemRouter = express.Router()



listaItemRouter.get("/:id", async (req, res) => {
    try{
        const items = await displayItem(req.params.id)
        res.status(200).json(items)
    } catch(err){
        console.log(err)
    }
})

// Criar um novo produto na lista específica (id).
// Enviamos ao createItem o req.body (com a descricao, quantidade e unidade e o id da lista)
listaItemRouter.post("/:id", async (req, res) => {
    try{
        await createItem(req.body, req.params.id)
        res.status(200).json("Sucesso")
    }catch(err){
        console.log(err)
    }
})

export default listaItemRouter