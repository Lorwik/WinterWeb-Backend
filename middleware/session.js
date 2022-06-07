const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");
const { usersModel } = require("../models");

const authMiddleware = async (req, res, next) => {
    try {
        
        if(!req.headers.authorization) {
            handleHttpError(res, "NO_HAS_INICIADO_SESION", 401);
            return;
        }

        const token = req.headers.authorization.split(" ").pop();
        const dataToken = await verifyToken(token);

        if(!dataToken) {
            handleHttpError(res, "NOT_PAYLOAD_DATA", 401);
            return;
        }

        const query = {
            id: dataToken.id
        }

        const user = await usersModel.findOne(query);
        req.user = user;

        next();

    } catch (error) {
        handleHttpError(res, "NO_HAS_INICIADO_SESION", 401);
    }

}

module.exports = authMiddleware;