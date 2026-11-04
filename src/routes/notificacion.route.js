const express = require('express');
const router = express.Router();
const notificacionController = require('../controllers/notificacion.controller');

/**
 * @swagger
 * tags:
 *   name: Notificaciones
 *   description: Gestión de notificaciones de usuarios
 */

/**
 * @swagger
 * /api/notificaciones:
 *   get:
 *     summary: Consultar todas las notificaciones
 *     tags: [Notificaciones]
 *     responses:
 *       200:
 *         description: Lista de notificaciones
 *       500:
 *         description: Error del servidor
 */
router.get('/', notificacionController.obtenerTodas);

/**
 * @swagger
 * /api/notificaciones/usuario/{idUsuario}:
 *   get:
 *     summary: Consultar notificaciones de un usuario
 *     tags: [Notificaciones]
 *     parameters:
 *       - in: path
 *         name: idUsuario
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Notificaciones del usuario
 *       400:
 *         description: ID inválido
 */
router.get('/usuario/:idUsuario', notificacionController.obtenerPorUsuario);

/**
 * @swagger
 * /api/notificaciones/{id}:
 *   get:
 *     summary: Consultar una notificación por ID
 *     tags: [Notificaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Notificación encontrada
 *       404:
 *         description: Notificación no encontrada
 */
router.get('/:id', notificacionController.obtenerPorId);

/**
 * @swagger
 * /api/notificaciones:
 *   post:
 *     summary: Crear una notificación
 *     tags: [Notificaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - IdUsuario
 *               - Titulo
 *               - Mensaje
 *             properties:
 *               IdUsuario:
 *                 type: integer
 *                 example: 1
 *               Titulo:
 *                 type: string
 *                 example: Cambio en el recorrido
 *               Mensaje:
 *                 type: string
 *                 example: Se ha actualizado el recorrido de tu ruta.
 *     responses:
 *       201:
 *         description: Notificación creada
 *       400:
 *         description: Datos inválidos
 */
router.post('/', notificacionController.crear);

/**
 * @swagger
 * /api/notificaciones/{id}/leida:
 *   patch:
 *     summary: Cambiar el estado de lectura de una notificación
 *     tags: [Notificaciones]
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
 *             type: object
 *             required:
 *               - Leida
 *             properties:
 *               Leida:
 *                 type: integer
 *                 enum: [0, 1]
 *                 example: 1
 *     responses:
 *       200:
 *         description: Estado de lectura actualizado
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Notificación no encontrada
 */
router.patch('/:id/leida', notificacionController.actualizarLeida);

module.exports = router;