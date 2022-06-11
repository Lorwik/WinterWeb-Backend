const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET

/**
 *  Debes pasar el objeto del usuario
 * @param {*} user 
 */
const tokenSign = async (user) => {
    console.log("HOLAAAAAAAAAAAAAAAAAAAAAAA")
    const sign = jwt.sign(
        {
            id: user.id,
            role: user.role,
        },
        JWT_SECRET,
        {
            expiresIn: '2h'
        }
    );

    return sign;
}

/**
 * Debes pasar el token de sesion
 * @param {*} tokenJwt 
 * @returns 
 */
const verifyToken = async (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, JWT_SECRET);
        
    } catch (error) {
        return null;

    }
 }

 module.exports = { tokenSign, verifyToken }