const sha256 = require('js-sha256');

/**
 * Contraseña sin encriptar
 * @param {*} passwordPlain 
 */
const encrypt = async (passwordPlain, salt) => {
    return sha256(passwordPlain + salt)
};

const generateRandomString = (num) => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result1= ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < num; i++ ) {
        result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result1;
}

const comparar = async (passwordPlain, salt, passwordHash) => {
    return await encrypt(passwordPlain, salt) === passwordHash;
}

module.exports = { encrypt, generateRandomString, comparar };