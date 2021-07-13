import mongodb from 'mongodb';
import getCollection from './db'
const {ObjectId} = mongodb


async function findListById(id){
    const collection = await getCollection("smartSavings", "Compras");
    const lista = await collection.findOne({_id: ObjectId(id)});
    return lista
}

async function updateListById(lista){
    // let listaActualizar = await findListById(lista._id)
    // console.log(lista)
    // console.log(listaActualizar)
    const collection = await getCollection("smartSavings", "Compras");
    const res = await collection.updateOne(
        {_id: lista._id},
        {$set: {items: lista.items}}
    )
}

export async function insertItem(item, id){
    const lista = await findListById(id);
    if(!lista.items){
        lista.items = []
    }
    lista.items.push(item);
    await updateListById(lista);
    return lista
}

export async function findItem(idLista){
    const lista = await findListById(idLista);
    console.log(lista.items)
    return lista.items
}