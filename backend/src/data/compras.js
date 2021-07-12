import mongodb from 'mongodb';
import getCollection from './db'
const {ObjectId} = mongodb

// async function getList(id){
//     const collection = await getCollection(DB_NAME, "lista");
//     return  await collection.findOne({_id: ObjectId(id)})
// }


// Nesta função inserimos um item e passamos-lhe um item.
// A coleção é o resultado de passar a colecção que queremos pesquisar (lista)
// A resposta do nosso pedido é inserir um item na colecção /criar uma nova
// A FAZER: CRIAR UMA LISTA DE LISTAS


// Vai encontrar a lista a que pretendemos aceder 
export async function findList(query, options){
    const collection = await getCollection("smartSavings", "Compras");
    const listas = await collection.find(query, options).toArray();
    console.log(listas)
    return listas
}


// Vai à colecção a que pretendemos aceder através do getCollection
// Recebeu o nomeDaLista da camada acima (services)
// E vai inserir uma nova lista na colecção das compras
export async function insertList(nomeDalista){
    const collection = await getCollection("smartSavings", "Compras");
    const res = await collection.insertOne(nomeDalista)
    // console.log(res)
    return res.insertedId
}


// NOTA: A FAZER DELETE PELO ID
// Acedemos à colecção que queremos e fazemos delete pelo ObjectId(id)
export async function deleteListById(id){
    const collection = await getCollection("smartSavings", "Compras");
    const res = await collection.deleteOne({_id: ObjectId(id)})
    return res.result.ok === 1
}
