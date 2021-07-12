// Serviços/ Camada intermédia:
// Criar a lista [X]
// Mostrar as listas [X]
// Apagar a lista [X]
// Lista em principio concluida

import {deleteListById, findList, insertList} from '../data/compras'


export async function displayLists(){
    return await findList({}, {projection: {Name: 1} }
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



