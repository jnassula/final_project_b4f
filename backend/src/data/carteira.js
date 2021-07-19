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

export async function showValueById(id) {
    const collection = await getCollection("smartSavings", "Carteira");
    const carteira = await collection.findOne({ _id: ObjectId(id) })

    return carteira;
}

export async function updateValueById(carteira, value) {
    const collection = await getCollection("smartSavings", "Carteira");
    const res = await collection.updateOne( { _id: ObjectId(carteira) }, { $set: { saldo: value } })

    return res
}


export async function insertWallet() {

    const collection = await getCollection("smartSavings", "Carteira");
    const res = await collection.insertOne({ saldo: 0 })

    // const carteira = await showValueById(id);
    // carteira.saldo.push(values);
    // await updateValueById(carteira);
    return res.insertedId;
}

export async function showValue() {
    const collection = await getCollection("smartSavings", "Carteira");
    const carteira = await collection.findOne({})
    if (carteira) {
        return carteira;
    } else return carteira
}

// export async function deleteWalletById(id) {
//     const collection = await getCollection("smartSavings", "Carteira");
//     const res = await collection.deleteOne({_id: ObjectId(id)});
//     return res.result.ok === 1;
// }