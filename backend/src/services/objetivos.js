//Objetivos / Camada Intermédia:
// Mostrar os objetivos [X]
// Criar os Objetivos [X]
// Concluir os Objetivos []
// Apagar os Objetivos [X]
// Confirmação do apagar objectivos []
// Wizard de configuração de objectivos []
// Contribuir para os mesmos e actualizar []

import { insertObjective, findObjective, deleteObjectiveById } from "../data/objetivos";

export async function displayObjective() {
    return await findObjective({}, { projection: { nameLista: 0 } }
    );
}

export async function createObjective(objObjetivo) {
    return await insertObjective(objObjetivo);
}

 
export async function eraseObjetive(id) {
    return await deleteObjectiveById(id);
}
