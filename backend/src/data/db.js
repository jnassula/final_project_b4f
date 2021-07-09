import mongodb from 'mongodb'
const {MongoClient} = mongodb
const URI = "mongodb://localhost:27017"
const DB_NAME = "smartSavings" // Talvez não precisamos



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



export default getCollection