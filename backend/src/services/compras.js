// Serviços/ Camada intermédia:
// Mostrar item
// Criar item
// Apagar item
// Se conseguirmos, actualizamos o item
// Enviamos a mensagem

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



