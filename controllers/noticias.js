const { matchedData } = require ("express-validator");
const { noticiasModel } = require('../models/noticias.js');
const { handleHttpError } = require('../utils/handleError');

/**
 * Lista de noticias
 * @param {*} req 
 * @param {*} res 
 */
const listarNoticias = async (req, res) => {
    try {
        const user = req.user;
        const data = await noticiasModel.find({});
        res.send({ data, user });
        
    } catch (error) {
        handleHttpError(res, 'ERROR_EN_LISTAR_NOTICIAS');
    }
}

/**
 *  Obtiene una noticia
 * @param {*} req 
 * @param {*} res 
 */
const getNoticia = async (req, res) => { 
    try {
        req = matchedData(req);
        const { id } = req;
        const data = await noticiasModel.findById(id);
        res.send( {data} );

    } catch (error) {
        handleHttpError(res, 'ERROR_GET_NOTICIA')
        
    }
};

/**
 * Inserta una noticia
 * @param {*} req 
 * @param {*} res 
 */
const insertarNoticia = async (req, res) => { 
    try {
        const body = matchedData(req);
        const data = await noticiasModel.create(body);
        res.send({ data });

    } catch (error) {
        handleHttpError(res, 'ERROR_INSERTAR_NOTICIA');
    }
}

/**
 * Edita una noticia
 * @param {*} req 
 * @param {*} res 
 */
const editarNoticia = async (req, res) => {
    try {
        const { id, ...body } = matchedData(req);

        const data = await noticiasModel.findOneAndUpdate(
            id, body
        );
        res.send({ data });
        
    } catch (error) {
        handleHttpError(res, 'ERROR_EDITAR_ NOTICIA');
    }
 }

 /**
  * Elimina una noticia
  * @param {*} req 
  * @param {*} res 
  */
const eliminarNoticia = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const data = await noticiasModel.delete({_id:id});
        res.send( {data} );

    } catch (error) {
        handleHttpError(res, 'ERROR_ELIMINAR_NOTICIA')
        
    }
 }

module.exports = { listarNoticias, getNoticia, insertarNoticia, editarNoticia, eliminarNoticia };