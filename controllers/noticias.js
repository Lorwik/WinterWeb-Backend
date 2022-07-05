const { matchedData } = require ("express-validator");
const { handleHttpError } = require('../utils/handleError');
const { noticiasModel } = require("../models");

/**
 * Lista de noticias
 * @param {*} req 
 * @param {*} res 
 */
const listarNoticias = async (req, res) => {
    try {
        const user = req.user;
        const data = await noticiasModel.findAll({});
        res.send({ data, user });
        
    } catch (error) {
        console.log(error)
        handleHttpError(res, 'Error al listar las noticias.');
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
        const data = await noticiasModel.findOne(id);
        res.status(201);
        res.send( {data} );

    } catch (error) {
        handleHttpError(res, 'Error al obtener las noticias.')
        
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
        res.status(201);
        res.send({ data });

    } catch (error) {
        handleHttpError(res, 'Error al publicar la noticia.');
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
        handleHttpError(res, 'Error al editar la noticia.');
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
        handleHttpError(res, 'Error al eliminar la noticia.')
        
    }
 }

module.exports = { listarNoticias, getNoticia, insertarNoticia, editarNoticia, eliminarNoticia };