import { showValue, insertWallet } from '../data/carteira';

export async function displayWallet(id) {
    return await showValue()
}

export async function createWallet() {
    return await insertWallet();
}
