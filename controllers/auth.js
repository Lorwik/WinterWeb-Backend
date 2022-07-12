const { matchedData } = require("express-validator");
const { encrypt, generateRandomString, comparar } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleJwt");
const { handleHttpError } = require("../utils/handleError");
const { cuentasModel } = require("../models");
const nodemailer = require('nodemailer');

/**
 * Este controlador es el encargado de registrar un usuario
 * @param {*} req 
 * @param {*} res 
 */
const registerCtrl = async (req, res) => {

    try {
        req = matchedData(req);
        const user = await cuentasModel.findOne({
            where: {
                username: req.username
            }
        });

        const email = await cuentasModel.findOne({
            where: {
                email: req.email
            }
        });

        if (user) {
            handleHttpError(res, "El nombre de usuario ya existe, por favor elija otro.", 404);
            return
        }

        if (email) {
            handleHttpError(res, "Ya hay una cuenta registrada con ese email.", 404);
            return
        }

        const salt = await generateRandomString(32);
        //const password = await sha256(req.password + salt)
        const password = await encrypt(req.password, salt);
        const id_confirmacion = await generateRandomString(12);
        const body = { ...req, password, salt, id_confirmacion };
        const dataUser = await cuentasModel.create(body)

        const data = {
            token: await tokenSign(dataUser),
        }

        // Definimos el transporter
        var transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: "argentumwinter@gmail.com",
                pass: "izjhvsthggkwderj"
            }
        });

        // Definimos el email
        var mailOptions = {
            from: 'no-reply@winterao.com',
            to: email,
            subject: 'Comunidad Winter- Verifica tú cuenta',
            text: 'Hola ' + user + ' te damos la bienvenida a la comunidad Winter. Para verificar tu cuenta, por favor ingresa a la siguiente dirección: http://winterao.com/verify e intruduce el siguiente código: ' + id_confirmacion
        };

        // Enviamos el email
        transporter.sendMail(mailOptions, function (error, info) {});

        res.status(201);
        res.send({ data });

    } catch (error) {
        handleHttpError(res, "Error al registrar la cuenta.");

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
            handleHttpError(res, "El usuario o la contraseña son incorrectos.", 404);
            return
        }

        const hashPassword = user.get('password');

        const salt = user.get('salt');
        const check = await comparar(req.password, salt, hashPassword);

        if (!check) {
            handleHttpError(res, "El usuario o la contraseña son incorrectos.", 401);
            return
        }

        const data = {
            token: await tokenSign(user),
        }

        res.status(201);
        res.send({ data })

    } catch (error) {
        handleHttpError(res, "Error al iniciar sesión.")
    }
}

/**
 * Este controlador es el encargado de cambiar la pass de una cuenta
 * @param {*} req 
 * @param {*} res 
 */
cambiarPassCtrl = async (req, res) => {

    try {
        const id = req.user.id;

        const user = await cuentasModel.findByPk(id);

        const hashPassword = user.get('password');
        const salt = user.get('salt');

        const check = await comparar(req.body.password, salt, hashPassword);

        if (!check) {
            handleHttpError(res, "El usuario o la contraseña son incorrectos.", 401);
            return
        }

        const newsalt = await generateRandomString(32);
        const password = await encrypt(req.body.password, newsalt);

        const result = await cuentasModel.update(
            {
                password: password,
                salt: newsalt
            },
            { where: { id: id } }
        );

        res.status(201);
        res.send(result)


    } catch (error) {
        handleHttpError(res, 'Error al cambiar contraseñas.');
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
        handleHttpError(res, 'Error al listar las cuentas.');
    }
}

module.exports = { registerCtrl, loginCtrl, listarCuentas, cambiarPassCtrl }