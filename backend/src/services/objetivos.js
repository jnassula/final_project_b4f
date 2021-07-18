//Objetivos / Camada Intermédia:
// Mostrar os objetivos [X]
// Criar os Objetivos [X]
// Concluir os Objetivos [X]
// Apagar os Objetivos [X]
// Confirmação do apagar objectivos []
// Wizard de configuração de objectivos [X]
// Contribuir para os mesmos e actualizar [X]

import { insertObjective, findObjective, deleteObjectiveById, findObjetiveById, updateOneById, updateOneByIdFinal } from "../data/objetivos";

export async function displayObjective() {
    return await findObjective({}, { projection: { nameLista: 0 } }
    );
}

export async function createObjective(objObjetivo) {
    return await insertObjective(objObjetivo);
}

export async function displayObjectiveById(id){
    return await findObjetiveById(id);
}


export async function eraseObjetive(id) {
    return await deleteObjectiveById(id);
}

export async function updateObjectiveById(objetivoActualizado){
    return await updateOneById(objetivoActualizado)
}


export async function updateObjectiveByIdFinal(objetivoActualizado){
    return await updateOneByIdFinal(objetivoActualizado)
}


