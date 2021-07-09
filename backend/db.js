import mongodb from 'mongodb'
const {MongoClient} = mongodb




const URI = "mongodb://localhost:27017"
const DB_NAME = "smartSavings"
// const {MongoClient} = mongodb 

let client

async function connect(uri){
    try{
        if (client) return client

        client = new MongoClient(uri, {
            useUnifiedTopology: true
        });
        await client.connect();
        return client;
    } catch(err){
        console.log(err)
    }
}


// Esta função assíncrona vai receber o nome da base de dados e a base de dados que nós queremos buscar 
// e devolver a colecção que corresponde àquele nome
export async function getCollection(dbName, colName){
    const client = await connect(URI)
    const db = client.db(dbName)
    return db.collection(colName)
}


export async function getList(id){
    const collection = await getCollection(DB_NAME, "lista");
    const identidade = id
    return collection.identidade
}


// Nesta função inserimos um item e passamos-lhe um item.
// A coleção é o resultado de passar a colecção que queremos pesquisar (lista)
// A resposta do nosso pedido é inserir um item na colecção /criar uma nova
// A FAZER: CRIAR UMA LISTA DE LISTAS
export async function insertItem(item){
    const collection = await getCollection(DB_NAME, "lista");
    const res = await collection.insertOne(item)
    return res.insertedId
}



