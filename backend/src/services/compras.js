// Serviços/ Camada intermédia:
// Mostrar as listas
// Criar a lista
// Apagar a lista

import {deleteListById, findList, insertList} from '../data/compras'


export async function displayLists(){
    return await findList({}, {projection: {name: 0} }
    );
}


// Cria uma lista invocando o insertList com o nome da lista
export async function createList(nomeDalista){
    // console.log("Camada services a funcionar")
    return await insertList(nomeDalista);
}


// NOTA: A FAZER DELETE PELO NOME, NÃO PELO ID
export async function eraseList(id){
    return await deleteListById(id);
}



