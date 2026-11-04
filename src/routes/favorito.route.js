
const express = require('express');
const router = express.Router();
const favoritoController = require('../controllers/favorito.controller');

/**
 * @swagger
 * tags:
 *   name: Favoritos
 *   description: Gestión de rutas favoritas de los usuarios
 */

/**
 * @swagger
 * /api/favoritos:
 *   get:
 *     summary: Obtener todos los favoritos
 *     tags: [Favoritos]
 *     responses:
 *       200:
 *         description: Lista de favoritos
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', favoritoController.obtenerTodos);

/**
 * @swagger
 * /api/favoritos/usuario/{idUsuario}:
 *   get:
 *     summary: Obtener favoritos de un usuario
 *     tags: [Favoritos]
 *     parameters:
 *       - in: path
 *         name: idUsuario
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identificador del usuario
 *     responses:
 *       200:
 *         description: Favoritos encontrados
 *       400:
 *         description: Identificador inválido
 *       500:
 *         description: Error interno del servidor
 */
router.get('/usuario/:idUsuario', favoritoController.obtenerPorUsuario);

/**
 * @swagger
 * /api/favoritos/{id}:
 *   get:
 *     summary: Obtener un favorito por ID
 *     tags: [Favoritos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identificador del favorito
 *     responses:
 *       200:
 *         description: Favorito encontrado
 *       400:
 *         description: Identificador inválido
 *       404:
 *         description: Favorito no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', favoritoController.obtenerPorId);

/**
 * @swagger
 * /api/favoritos:
 *   post:
 *     summary: Registrar una ruta como favorita
 *     tags: [Favoritos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - IdUsuario
 *               - IdRuta
 *             properties:
 *               IdUsuario:
 *                 type: integer
 *                 example: 1
 *               IdRuta:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Favorito registrado correctamente
 *       400:
 *         description: Datos inválidos o usuario/ruta inexistente
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', favoritoController.crear);

/**
 * @swagger
 * /api/favoritos/{id}:
 *   put:
 *     summary: Actualizar un favorito
 *     tags: [Favoritos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identificador del favorito
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - IdUsuario
 *               - IdRuta
 *             properties:
 *               IdUsuario:
 *                 type: integer
 *                 example: 1
 *               IdRuta:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Favorito actualizado correctamente
 *       400:
 *         description: Datos inválidos o usuario/ruta inexistente
 *       404:
 *         description: Favorito no encontrado o sin cambios
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', favoritoController.actualizar);

module.exports = router;
