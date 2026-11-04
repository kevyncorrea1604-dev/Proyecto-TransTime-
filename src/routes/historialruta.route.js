
const express = require('express');
const router = express.Router();

const historialRutaController = require('../controllers/historialruta.controller');

/**
 * @swagger
 * tags:
 *   name: Historial de rutas
 *   description: Consultas y registros del historial de rutas
 */

/**
 * @swagger
 * /api/historialrutas:
 *   get:
 *     summary: Obtener todo el historial de rutas
 *     tags: [Historial de rutas]
 *     responses:
 *       200:
 *         description: Lista del historial
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', historialRutaController.obtenerTodos);

/**
 * @swagger
 * /api/historialrutas/usuario/{idUsuario}:
 *   get:
 *     summary: Obtener el historial de un usuario
 *     tags: [Historial de rutas]
 *     parameters:
 *       - in: path
 *         name: idUsuario
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identificador del usuario
 *     responses:
 *       200:
 *         description: Historial del usuario
 *       400:
 *         description: Identificador inválido
 *       500:
 *         description: Error interno del servidor
 */
router.get('/usuario/:idUsuario', historialRutaController.obtenerPorUsuario);

/**
 * @swagger
 * /api/historialrutas/{id}:
 *   get:
 *     summary: Obtener un registro del historial por ID
 *     tags: [Historial de rutas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identificador del historial
 *     responses:
 *       200:
 *         description: Registro encontrado
 *       400:
 *         description: Identificador inválido
 *       404:
 *         description: Registro no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', historialRutaController.obtenerPorId);

/**
 * @swagger
 * /api/historialrutas:
 *   post:
 *     summary: Registrar una ruta consultada por un usuario
 *     tags: [Historial de rutas]
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
 *               Estado:
 *                 type: string
 *                 maxLength: 30
 *                 default: Consultada
 *                 example: Consultada
 *     responses:
 *       201:
 *         description: Registro creado
 *       400:
 *         description: Datos inválidos o usuario/ruta inexistente
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', historialRutaController.crear);

/**
 * @swagger
 * /api/historialrutas/{id}/estado:
 *   patch:
 *     summary: Actualizar el estado de un registro del historial
 *     tags: [Historial de rutas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identificador del historial
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
 *                 example: Consultada
 *     responses:
 *       200:
 *         description: Estado actualizado
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Registro no encontrado o sin cambios
 *       500:
 *         description: Error interno del servidor
 */
router.patch('/:id/estado', historialRutaController.actualizarEstado);

module.exports = router;
