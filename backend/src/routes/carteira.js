import express from 'express';
import { displayWallet, createWallet } from '../services/carteira';

const carteiraRouter = express.Router()

carteiraRouter.get('/', async (req, res) => {
    const valor = await displayWallet() ;
        if (valor!== null) {
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


// carteiraRouter.post('/', async (req, res) => {
//     try {
//         const idCarteira = await createWallet(req.body.saldo)
//         res.status(200).json({
//             saldo: req.body.saldo,
//             id: idCarteira
//         })
//     } catch (err) {
//         console.log(err)
//     }
// })


export default carteiraRouter;