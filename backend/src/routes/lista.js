import express from 'express'
import { createItem, displayItems, eraseItem } from '../services/lista'

// Vamos enviar os items que a lista tem através do /lista/:id/items com um GET para mostrar os produtos
// Vamos adicionar à lista específica que acedemos (através do ID) com um POST para criar um produto (OBJECTO) e colocá-lo no array ITEMS []
// Vamos editar o item através de um PATCH

const itemRouter = express.Router()

itemRouter.get("/", async (req, res) => {
    try {
        res.status(200).json({
            itens: await displayItems()
        })
    } catch (err) {
        console.log(err)
    }
})

itemRouter.post("/", async (req, res) => {
    try {
        const idDoItem = await createItem(req.body)
        console.log(req.body)
        res.status(201).json({
            Descricao: req.body.descricao,
            Quantidade: req.body.quantidade,
            Unidade: req.body.unidade,
            id: idDoItem
        })
    } catch (err) {
        console.log(err)
    }
})

itemRouter.delete("/:id", async (req, res) => {
    try {
        const removido = await eraseItem(req.params.id)
        console.log(req.params)
        if (removido) {
            res.status(200).json()
        }
    } catch (err) {
        console.log(err)
    }
})

export default itemRouter
