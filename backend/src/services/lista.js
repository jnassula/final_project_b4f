// Serviços/ Camada intermédia:
// Mostrar produto []
// Criar produto []
// Apagar produto []
// Se conseguirmos, actualizamos o produto []
// Enviamos a mensagem [X]

import { deleteItemsById, findItems, insertItem } from "../data/lista";

export async function displayItems() {
    return await findItems({}, {})
}

export async function createItem(descricaoDoItem) {
    return await insertItem(descricaoDoItem);
}

export async function eraseItem(id) {
    return await deleteItemsById(id)
}