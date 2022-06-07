const bcryptjs = require("bcryptjs");

/**
 * Contraseña sin encriptar
 * @param {*} passwordPlain 
 */
const encrypt = async (passwordPlain, salt) => {
    const hash = await bcryptjs.hash(passwordPlain, salt)
    return hash
};

/**
 * Pasar contraseña sin encriptar y pasar contraseña encriptada
 * @param {*} passwordPlain 
 * @param {*} hashPassword 
 */
const compare = async (passwordPlain, hashPassword) => {
    return await bcryptjs.compare(passwordPlain, hashPassword)
};

module.exports = { encrypt, compare };