// Serviços/ Camada intermédia:
// Mostrar item
// Criar item
// Apagar item
// Se conseguirmos, actualizamos o item
// Enviamos a mensagem

import insertList from '../data/lista'

async function createList(nomeDalista){
    console.log("Camada serviços a bombar")
    return await insertList(nomeDalista)
    
}


export default createList