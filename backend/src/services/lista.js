// Serviços/ Camada intermédia:
// Mostrar produto []
// Criar produto [X]
// Apagar produto []
// Se conseguirmos, actualizamos o produto []
// Enviamos a mensagem [X]


import { findItem, insertItem } from "../data/lista";




export async function createItem(item, id){
    // console.log("CreateItem services a funcionar")
    return await insertItem(item, id);
}


export async function displayItem(idLista){
    return await findItem(idLista)
}