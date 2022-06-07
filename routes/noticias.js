const express = require("express");
const router = express.Router();
const { listarNoticias, getNoticia, insertarNoticia, editarNoticia, eliminarNoticia } = require("../controllers/noticias");
const { validatorInsertarNoticia, validatorObtenerNoticia } = require('../validators/noticias');
const authMiddleware = require('../middleware/session');
const checkRol = require('../middleware/rol');

/**
 * Obtiene la lista de noticias
 */
router.get("/", listarNoticias);

/**
 * Obtiene una noticia
 */
router.get("/:id", validatorObtenerNoticia, getNoticia);

/**
 * Crear una noticia
 */
router.post("/", authMiddleware, checkRol(["admin"]), insertarNoticia );

/**
 * Edita una noticia
 */
 router.put("//", authMiddleware, checkRol(["admin"]), editarNoticia );

 /**
  * Elimina una noticia
  */
 router.delete("/", authMiddleware, checkRol(["admin"]), eliminarNoticia );

module.exports = router;