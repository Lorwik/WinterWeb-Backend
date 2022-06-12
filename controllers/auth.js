const { matchedData } = require("express-validator");
const { encrypt, generateRandomString, comparar } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleJwt");
const { handleHttpError } = require("../utils/handleError");
const { cuentasModel } = require("../models");
const { sha256 } = require('js-sha256');
/**
 * Este controlador es el encargado de registrar un usuario
 * @param {*} req 
 * @param {*} res 
 */
const registerCtrl = async (req, res) => {
    try {
        req = matchedData(req);
        const salt = await generateRandomString(32);
        //const password = await sha256(req.password + salt)
        const password = await encrypt(req.password, salt);
        const body = { ...req, password, salt };
        const dataUser = await cuentasModel.create(body)
        dataUser.set('password', undefined, { strict: false });

        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }

        res.status(201);
        res.send({ data });

    } catch (error) {
        console.log("ERROR:", error)
        handleHttpError(res, "ERROR_REGISTER_USER");

    }
}

/**
 * Este controlador es el encargado de logear una persona
 * @param {*} req 
 * @param {*} res 
 */
const loginCtrl = async (req, res) => {
    try {
        req = matchedData(req);
        const user = await cuentasModel.findOne({
            where: {
                username: req.username
            }
        });

        if (!user) {
            handleHttpError(res, "USER_NOT_EXISTS", 404);
            return
        }

        const hashPassword = user.get('password');

        const salt = user.get('salt');
        const check = await comparar(req.password, salt, hashPassword);

        if (!check) {
            handleHttpError(res, "PASSWORD_INVALID", 401);
            return
        }

        user.set('password', undefined, { strict: false })
        user.set('salt', undefined, { strict: false })
        const data = {
            token: await tokenSign(user),
            user
        }

        res.send({ data })

    } catch (error) {
        console.log(e)
        handleHttpError(res, "ERROR_LOGIN_USER")
    }
}

/**
 * Lista de noticias
 * @param {*} req 
 * @param {*} res 
 */
 const listarCuentas = async (req, res) => {
    try {
        const user = req.user;
        const data = await cuentasModel.find({});
        res.send({ data, user });
        
    } catch (error) {
        handleHttpError(res, 'ERROR_EN_LISTAR_CUENTAS');
    }
}

module.exports = { registerCtrl, loginCtrl, listarCuentas }