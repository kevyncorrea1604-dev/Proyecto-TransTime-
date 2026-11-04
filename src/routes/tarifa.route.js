const express = require('express');
const router = express.Router();

const tarifaController = require('../controllers/tarifa.controller');

/**
 * @swagger
 * tags:
 *   name: Tarifas
 *   description: Administración de tarifas asociadas a las rutas
 */

/**
 * @swagger
 * /api/tarifas:
 *   get:
 *     summary: Consultar todas las tarifas
 *     tags: [Tarifas]
 *     responses:
 *       200:
 *         description: Lista de tarifas
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', tarifaController.obtenerTodas);

/**
 * @swagger
 * /api/tarifas/ruta/{idRuta}:
 *   get:
 *     summary: Consultar las tarifas de una ruta
 *     tags: [Tarifas]
 *     parameters:
 *       - in: path
 *         name: idRuta
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identificador de la ruta
 *     responses:
 *       200:
 *         description: Tarifas de la ruta
 *       400:
 *         description: Identificador inválido
 *       500:
 *         description: Error interno del servidor
 */
router.get('/ruta/:idRuta', tarifaController.obtenerPorRuta);

/**
 * @swagger
 * /api/tarifas/{id}:
 *   get:
 *     summary: Consultar una tarifa por ID
 *     tags: [Tarifas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identificador de la tarifa
 *     responses:
 *       200:
 *         description: Tarifa encontrada
 *       400:
 *         description: Identificador inválido
 *       404:
 *         description: Tarifa no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', tarifaController.obtenerPorId);

/**
 * @swagger
 * /api/tarifas:
 *   post:
 *     summary: Registrar una tarifa
 *     tags: [Tarifas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - IdRuta
 *               - Valor
 *             properties:
 *               IdRuta:
 *                 type: integer
 *                 example: 1
 *               Valor:
 *                 type: number
 *                 format: double
 *                 example: 3500.00
 *               Estado:
 *                 type: string
 *                 maxLength: 30
 *                 default: Activo
 *                 example: Activo
 *     responses:
 *       201:
 *         description: Tarifa registrada
 *       400:
 *         description: Datos inválidos o ruta inexistente
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', tarifaController.crear);

/**
 * @swagger
 * /api/tarifas/{id}:
 *   put:
 *     summary: Actualizar una tarifa
 *     tags: [Tarifas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identificador de la tarifa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - IdRuta
 *               - Valor
 *               - Estado
 *             properties:
 *               IdRuta:
 *                 type: integer
 *                 example: 1
 *               Valor:
 *                 type: number
 *                 format: double
 *                 example: 4000.00
 *               Estado:
 *                 type: string
 *                 maxLength: 30
 *                 example: Activo
 *     responses:
 *       200:
 *         description: Tarifa actualizada
 *       400:
 *         description: Datos inválidos o ruta inexistente
 *       404:
 *         description: Tarifa no encontrada o sin cambios
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', tarifaController.actualizar);

/**
 * @swagger
 * /api/tarifas/{id}/estado:
 *   patch:
 *     summary: Actualizar el estado de una tarifa
 *     tags: [Tarifas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identificador de la tarifa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Estado
 *             properties:
 *               Estado:
 *                 type: string
 *                 maxLength: 30
 *                 example: Inactiva
 *     responses:
 *       200:
 *         description: Estado actualizado
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Tarifa no encontrada o sin cambios
 *       500:
 *         description: Error interno del servidor
 */
router.patch('/:id/estado', tarifaController.actualizarEstado);

module.exports = router;
