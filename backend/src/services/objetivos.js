//Objetivos / Camada Intermédia:
// Mostrar os objetivos
// Criar os Objetivos
// Concluir os Objetivos
// Aapagar os Objetivos
// Contribuir para os mesmos

import { insertObjective, findObjective, deleteObjectiveById } from "../data/objetivos";

export async function displayObjective() {
    return await findObjective({}, { projection: { name: 0 } }
    );
}


export async function createObjective(objObjetivo) {
    return await insertObjective(objObjetivo);
}


export async function eraseObjetive(id) {
    return await deleteObjectiveById(id);
}
