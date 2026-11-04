const express = require('express');
const router = express.Router();

const controller = require('../controllers/rutapuntoreferencia.controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     RutaPuntoReferencia:
 *       type: object
 *       required:
 *         - IdRuta
 *         - IdPuntoReferencia
 *         - OrdenPuntoReferencia
 *         - TiempoEstimado
 *       properties:
 *         IdRutaPuntoReferencia:
 *           type: integer
 *           example: 1
 *         IdRuta:
 *           type: integer
 *           example: 2
 *         IdPuntoReferencia:
 *           type: integer
 *           example: 3
 *         OrdenPuntoReferencia:
 *           type: integer
 *           example: 1
 *         TiempoEstimado:
 *           type: integer
 *           description: Tiempo estimado en minutos
 *           example: 15
 */

/**
 * @swagger
 * /api/rutas-puntos-referencia:
 *   get:
 *     summary: Consultar todas las relaciones entre rutas y puntos
 *     tags: [Rutas y puntos de referencia]
 *     responses:
 *       200:
 *         description: Lista de relaciones
 */
router.get('/', controller.obtenerTodos);

/**
 * @swagger
 * /api/rutas-puntos-referencia/ruta/{idRuta}:
 *   get:
 *     summary: Consultar los puntos de referencia de una ruta
 *     tags: [Rutas y puntos de referencia]
 *     parameters:
 *       - in: path
 *         name: idRuta
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de puntos de la ruta, ordenados por recorrido
 */
router.get('/ruta/:idRuta', controller.obtenerPorRuta);

/**
 * @swagger
 * /api/rutas-puntos-referencia/{id}:
 *   get:
 *     summary: Consultar una relación por su ID
 *     tags: [Rutas y puntos de referencia]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Relación encontrada
 *       404:
 *         description: Relación no encontrada
 */
router.get('/:id', controller.obtenerPorId);

/**
 * @swagger
 * /api/rutas-puntos-referencia:
 *   post:
 *     summary: Asociar un punto de referencia con una ruta
 *     tags: [Rutas y puntos de referencia]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RutaPuntoReferencia'
 *     responses:
 *       201:
 *         description: Relación creada
 *       400:
 *         description: Datos inválidos o ruta/punto inexistente
 */
router.post('/', controller.crear);

/**
 * @swagger
 * /api/rutas-puntos-referencia/{id}:
 *   put:
 *     summary: Actualizar una relación entre ruta y punto
 *     tags: [Rutas y puntos de referencia]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RutaPuntoReferencia'
 *     responses:
 *       200:
 *         description: Relación actualizada
 *       404:
 *         description: Relación no encontrada
 */
router.put('/:id', controller.actualizar);

/**
 * @swagger
 * /api/rutas-puntos-referencia/{id}:
 *   delete:
 *     summary: Eliminar la asociación entre ruta y punto
 *     description: Elimina la relación, no el punto de referencia ni la ruta.
 *     tags: [Rutas y puntos de referencia]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Relación eliminada
 *       404:
 *         description: Relación no encontrada
 */
router.delete('/:id', controller.eliminar);

module.exports = router;
