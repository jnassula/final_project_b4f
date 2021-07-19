import express from 'express';
import { displayWallet, createWallet, updateWallet } from '../services/carteira';

const carteiraRouter = express.Router()

carteiraRouter.get('/', async (req, res) => {
    const valor = await displayWallet() ;
        if (valor !== null) {
            res.status(200).json({
                carteira: valor
            })
        } else{
            res.status(404).json("Não tem carteira")
        }
    }
)

carteiraRouter.post('/', async (req, res) => {
    try {
        await createWallet()
        res.status(201).json({
            saldo: 0
        })
    } catch (err) {
        console.log(err)
    }
})

carteiraRouter.patch('/:id', async (req, res) => {
    try {
        console.log(req.body.valor)
        console.log(req.body.id)
        await updateWallet(req.body.valor, req.body.id)
        res.status(200).json("A funcionar")
    } catch(err) {
        console.log(err)
    }
})


export default carteiraRouter;