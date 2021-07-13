import { ShowValue, insertValue } from '../data/carteira';

export async function displayWallet() {
    return await showValue({}, {projection: {value: 1}}
        );
}

export async function createWallet(saldoCarteira) {
    return await insertValue(saldoCarteira);
}
