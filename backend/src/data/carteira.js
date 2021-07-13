// Serviços
// Mostrar o valor actual
// Adicionar dinheiro
// Adicionar gastos

// Se conseguirmos:
// Adicionar o histórico
// Mostrar os movimentos do histórico
// Adicionar movimentos ao histórico

import mongodb from 'mongodb';
import getCollection from './db';


const { ObjectId } = mongodb;

async function showValueById(id) {
    const collection = await getCollection("smartSavings", "Carteira");
    const carteira = await collection.findOne({_id: ObjectId(id)})
    
    return carteira;
}

async function updateValueById(carteira) {
    const collection = await getCollection("smartSavings", "Carteira");
    const res = await collection.updateOne({_id: carteira})
}


export async function insertValue(values, id) {
    const carteira = await showValueById(id);
    carteira.saldo.push(values);
    await updateValueById(carteira);
    return carteira;
}

export async function showValue(values) {
    const carteira = await showValueById(idValue)
    return carteira.saldo;
}

// export async function deleteWalletById(id) {
//     const collection = await getCollection("smartSavings", "Carteira");
//     const res = await collection.deleteOne({_id: ObjectId(id)});
//     return res.result.ok === 1;
// }