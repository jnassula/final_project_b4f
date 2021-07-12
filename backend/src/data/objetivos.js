import mongodb from 'mongodb';
import getCollection from './db'
const {ObjectId} = mongodb

export async function insertObjective(objObjetivo){
    const collection = await getCollection("smartSavings", "Objetivos");
    const res = await collection.insertOne(objObjetivo)
    // console.log(res)
    return res.insertedId
}

export async function findObjective(query, options){
    const collection = await getCollection("smartSavings", "Objetivos");
    const objetivos = await collection.find(query, options).toArray();
    return objetivos
}