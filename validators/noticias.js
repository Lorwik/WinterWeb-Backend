const { check } = require('express-validator');
const validationResult = require("../utils/handleValidator");

const validatorInsertarNoticia = [
    check("titulo")
    .exists()
    .notEmpty()
    .isLength({ min: 5, max: 90 }),

    check("cuerpo")
    .exists()
    .notEmpty(),

    (req, res, next) => {
        validationResult(req, res, next);
    }

];

const validatorObtenerNoticia = [
    check("id")
    .exists()
    .notEmpty(),

    (req, res, next) => {
        validationResult(req, res, next);
    }


];

module.exports = { validatorInsertarNoticia, validatorObtenerNoticia };