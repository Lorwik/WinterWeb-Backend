const express = require("express");
const router = express.Router();
const { listarNoticias, getNoticia, insertarNoticia, editarNoticia, eliminarNoticia } = require("../controllers/noticias");
const { validatorInsertarNoticia, validatorObtenerNoticia } = require('../validators/noticias');
const authMiddleware = require('../middleware/session');
const checkRol = require('../middleware/rol');

/**
 * Get all noticias
 * @openapi
 * /storage:
 *    get:
 *      tags:
 *        - noticias
 *      summary: "Listar noticias"
 *      description: Obten todas las listas de las mptocoas
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna la listas de las noticias.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/noticias'
 *        '422':
 *          description: Error de validacion.
 */
router.get("/", listarNoticias);

/**
 * Obtiene una noticia
 */
router.get("/:id", validatorObtenerNoticia, getNoticia);

/**
 * Crear una noticia
 */
router.post("/", authMiddleware, checkRol(["admin"]), validatorInsertarNoticia, insertarNoticia );

/**
 * Edita una noticia
 */
 router.put("/", authMiddleware, checkRol(["admin"]), editarNoticia );

 /**
  * Elimina una noticia
  */
 router.delete("/", authMiddleware, checkRol(["admin"]), eliminarNoticia );

module.exports = router;