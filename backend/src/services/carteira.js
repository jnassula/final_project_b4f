import { showValue, insertWallet, updateValueById } from '../data/carteira';

export async function displayWallet(id) {
    return await showValue()
}

export async function createWallet() {
    return await insertWallet();
}

export async function updateWallet(addedValue, id) {
    return await updateValueById(addedValue, id)
}
