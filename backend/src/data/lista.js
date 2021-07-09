import getCollection from './db'


async function getList(id){
    const collection = await getCollection(DB_NAME, "lista");
    return  await collection.findOne({_id: ObjectId(id)})
}


// Nesta função inserimos um item e passamos-lhe um item.
// A coleção é o resultado de passar a colecção que queremos pesquisar (lista)
// A resposta do nosso pedido é inserir um item na colecção /criar uma nova
// A FAZER: CRIAR UMA LISTA DE LISTAS
async function insertItem(item){
    const collection = await getCollection(DB_NAME, "lista");
    const res = await collection.insertOne()
    return res.insertedId
}



export default {getCollection, getList, insertItem}