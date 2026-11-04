
const express = require('express');
const router = express.Router();

const ubicacionController = require('../controllers/ubicacion.controller');

/**
 * @swagger
 * tags:
 *   name: Ubicaciones
 *   description: Registro y consulta de ubicaciones de las busetas
 */

/**
 * @swagger
 * /api/ubicaciones:
 *   get:
 *     summary: Obtener todas las ubicaciones
 *     tags: [Ubicaciones]
 *     responses:
 *       200:
 *         description: Lista de ubicaciones
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', ubicacionController.obtenerTodas);

/**
 * @swagger
 * /api/ubicaciones/buseta/{idBuseta}:
 *   get:
 *     summary: Consultar las ubicaciones de una buseta
 *     tags: [Ubicaciones]
 *     parameters:
 *       - in: path
 *         name: idBuseta
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identificador de la buseta
 *     responses:
 *       200:
 *         description: Historial de ubicaciones de la buseta
 *       400:
 *         description: Identificador inválido
 *       500:
 *         description: Error interno del servidor
 */
router.get('/buseta/:idBuseta', ubicacionController.obtenerPorBuseta);

/**
 * @swagger
 * /api/ubicaciones/{id}:
 *   get:
 *     summary: Consultar una ubicación por ID
 *     tags: [Ubicaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identificador de la ubicación
 *     responses:
 *       200:
 *         description: Ubicación encontrada
 *       400:
 *         description: Identificador inválido
 *       404:
 *         description: Ubicación no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', ubicacionController.obtenerPorId);

/**
 * @swagger
 * /api/ubicaciones:
 *   post:
 *     summary: Registrar una ubicación de una buseta
 *     tags: [Ubicaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - IdBuseta
 *               - Latitud
 *               - Longitud
 *             properties:
 *               IdBuseta:
 *                 type: integer
 *                 example: 1
 *               Latitud:
 *                 type: number
 *                 format: double
 *                 example: 4.4389
 *               Longitud:
 *                 type: number
 *                 format: double
 *                 example: -75.2322
 *     responses:
 *       201:
 *         description: Ubicación registrada
 *       400:
 *         description: Datos inválidos o buseta inexistente
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', ubicacionController.crear);

/**
 * @swagger
 * /api/ubicaciones/{id}:
 *   put:
 *     summary: Actualizar una ubicación existente
 *     tags: [Ubicaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identificador de la ubicación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - IdBuseta
 *               - Latitud
 *               - Longitud
 *             properties:
 *               IdBuseta:
 *                 type: integer
 *                 example: 1
 *               Latitud:
 *                 type: number
 *                 format: double
 *                 example: 4.4389
 *               Longitud:
 *                 type: number
 *                 format: double
 *                 example: -75.2322
 *     responses:
 *       200:
 *         description: Ubicación actualizada
 *       400:
 *         description: Datos inválidos o buseta inexistente
 *       404:
 *         description: Ubicación no encontrada o sin cambios
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', ubicacionController.actualizar);

module.exports = router;