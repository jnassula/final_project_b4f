import express from 'express';
import { displayWallet, createWallet } from '../services/carteira';

const carteiraRouter = express.Router()

carteiraRouter.get('/', async (req, res) => {
    try {
        res.status(200).json({
            Carteira: await displayWallet()
        })
    } catch (err) {
        console.log(err)
    }
})


carteiraRouter.post('/', async (req, res) => {
    try {
        const idCarteira = await createWallet(req.body)
        res.status(20).json({
            Saldo: req.body.saldo,
        })
    } catch (err) {
        console.log(err)
    }
})


export default carteiraRouter;