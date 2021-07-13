// Serviços/ Camada intermédia:
// Mostrar produto []
// Criar produto []
// Apagar produto []
// Se conseguirmos, actualizamos o produto []
// Enviamos a mensagem [X]


import { insertItem } from "../data/lista";

export async function createItem(item, id){
    console.log("CreateItem services a funcionar")
    return await insertItem(item, id);
}