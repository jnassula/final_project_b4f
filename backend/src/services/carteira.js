import { showValue, insertValue } from '../data/carteira';

export async function displayWallet(id) {
    return await showValue()
}

export async function createWallet(saldoCarteira) {
    return await insertValue(saldoCarteira);
}
