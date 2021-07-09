import express  from "express";
const PORT = 3001
const app = express()
import {getCollection, insertItem, getList}  from './db.js'


app.use(express.json())

// Teste back e front
app.get('/', (req, res) => {
    res.status(200).json({
        message: "A comunicar back e front"
    })
})


app.get('/lista', (req, res) => {
    try{
        console.log("get lista a funcionar")
    }catch(err){
        console.log(err)
    }
    
})

// POST para adicionar items à lista
app.post('/lista', async (req, res) => {
    try{
        const lista = await insertItem(req.body)
        res.status(200).json({lista})
    }catch(err){
        console.log(err)
    }
})


app.post('/mensagem', async (req, res) => {
    try{
        res.status(200).json(`Notificação enviada a todos os elementos do grupo.`)
    }catch(err){
        console.log(err)
    }
})


app.listen(PORT, () => console.log(`À escuta em ${PORT}`))