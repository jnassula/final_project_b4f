import express from 'express';
import { displayWallet, createWallet } from '../services/carteira';

const carteiraRouter = express.Router()

carteiraRouter.get('/', async (req, res) => {
    try {
        res.status(200).json({
            carteira: await displayWallet()
        })
    } catch (err) {
        console.log(err)
    }
})


carteiraRouter.post('/', async (req, res) => {
    try {
        const idCarteira = await createWallet(req.body.saldo)
        res.status(200).json({
            saldo: req.body.saldo,
            id: idCarteira
        })
    } catch (err) {
        console.log(err)
    }
})


export default carteiraRouter;