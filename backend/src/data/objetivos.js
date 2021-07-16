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

export async function findObjetiveById(id){
    const collection = await getCollection("smartSavings, Objetivos");
    const res = await collection.findOne({_id: ObjectId(id)})
    return res
}

export async function deleteObjectiveById(id){
    const collection = await getCollection ("smartSavings", "Objetivos");
    const res = await collection.deleteOne({_id: ObjectId(id)})
    return res.result.ok === 1
}