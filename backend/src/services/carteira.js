import { showValue, insertWallet, addValueById, subtractValueById } from '../data/carteira';

export async function displayWallet(id) {
    return await showValue()
}

export async function createWallet() {
    return await insertWallet();
}

export async function updateWallet(addedValue, id) {
    return await addValueById(addedValue, id)
}


export async function spendWallet(value, id){
    return await subtractValueById(value, id)
}