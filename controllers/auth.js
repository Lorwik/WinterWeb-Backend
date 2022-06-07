const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleJwt");
const { handleHttpError } = require("../utils/handleError");
const { cuentasModel } = require("../models");
const bcryptjs = require("bcryptjs");

/**
 * Este controlador es el encargado de registrar un usuario
 * @param {*} req 
 * @param {*} res 
 */
const registerCtrl = async (req, res) => {
    try {
        req = matchedData(req);
        const salt = bcryptjs.genSaltSync(10);
        const password = await encrypt(req.password, salt);
        const body = {...req, password, salt };
        const dataUser = await cuentasModel.create(body)
        dataUser.set('password', undefined, {strict: false});
    
        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }
    
        res.send({data});
        
    } catch (error) {
        console.log("ERROR:",  error)
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
        const user = await cuentasModel.findOne({username: req.username})

        if(!user) {
            handleHttpError(res, "ERROR_NOT_EXISTS", 404);
            return;
        }

        const hashPassword = user.get('password');
        const check = await compare(req.password, hashPassword);

        if(!check) {
            handleHttpError(res, "PASSWORD_INVALID", 401);
            return;
        }

        user.set('password', undefined, {strict: false});
        const data = {
            token: await tokenSign(user),
            user
        }

        res.send({data});

    } catch (error) {
        console.log(error)
        handleHttpError(res, "ERROR_LOGIN_USER");
    }

 }

module.exports = { registerCtrl, loginCtrl }