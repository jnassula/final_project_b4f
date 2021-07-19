import mongodb from 'mongodb';
import getCollection from './db'
const {ObjectId} = mongodb

// Cria um novo objetivo e retorna o seu id
export async function insertObjective(objObjetivo){
    const collection = await getCollection("smartSavings", "Objetivos");
    const res = await collection.insertOne(objObjetivo)
    // console.log(res)
    return res.insertedId
}

// Encontra e retorna todos os objetivos
export async function findObjective(query, options){
    const collection = await getCollection("smartSavings", "Objetivos");
    const objetivos = await collection.find(query, options).toArray(); 
    return objetivos
}

// Econtra o objetivo pelo Id e retorna-o
export async function findObjetiveById(id){
    const collection = await getCollection("smartSavings", "Objetivos");
    const res = await collection.findOne({_id: ObjectId(id)})
    return res
}

// Encontra o objetivo pelo Id e apaga-o
export async function deleteObjectiveById(id){
    const collection = await getCollection ("smartSavings", "Objetivos");
    const res = await collection.deleteOne({_id: ObjectId(id)})
    return res.result.ok === 1
}


// Vai receber o objetivo já actualizado e gravar na base de dados o objetivo actualizado com o valor contribuido
export async function updateOneById(objetivoAtualizado){
    const collection = await getCollection ("smartSavings", "Objetivos");
    console.log(objetivoAtualizado)
    const res = await collection.updateOne(
        {_id: ObjectId(objetivoAtualizado._id)},
        {
            $set: {
                valorContribuido: objetivoAtualizado.valorContribuido,
                qtdContribuicoes: objetivoAtualizado.qtdContribuicoes
            }
        })
    return res.result.ok === 1
}