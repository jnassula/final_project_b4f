import mongodb from 'mongodb'
import getCollection from './db'

const { ObjectId } = mongodb


export async function findItems(query, options) {
    const collection = await getCollection("smartSavings", "Lista");
    const itens = await collection.find(query, options).toArray();

    return itens;
}


export async function insertItem(descricaoDoItem) {
    const collection = await getCollection("smartSavings", "Lista");
    const res = await collection.insertOne(descricaoDoItem);

    return res.insertedId;
}


export async function deleteItemsById(id) {
    const collection = await getCollection("smartSavings", "Lista");
    const res = await collection.deleteOne({ _id: ObjectId(id) });

    return res.result.ok === 1;
}