const express = require('express');
const router = express.Router();
const recorridoController = require('../controllers/recorrido.controller');

/**
 * @swagger
 * tags:
 *   name: Recorridos
 *   description: Gestión de los puntos y el orden de los recorridos
 */

/**
 * @swagger
 * /api/recorridos:
 *   get:
 *     summary: Consultar todos los recorridos
 *     tags: [Recorridos]
 *     responses:
 *       200:
 *         description: Lista de recorridos consultada correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', recorridoController.obtenerTodos);

/**
 * @swagger
 * /api/recorridos/ruta/{idRuta}:
 *   get:
 *     summary: Consultar los puntos de una ruta en orden
 *     tags: [Recorridos]
 *     parameters:
 *       - in: path
 *         name: idRuta
 *         required: true
 *         description: Identificador de la ruta
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Recorridos de la ruta consultados correctamente
 *       400:
 *         description: ID de ruta inválido
 *       500:
 *         description: Error interno del servidor
 */
router.get('/ruta/:idRuta', recorridoController.obtenerPorRuta);

/**
 * @swagger
 * /api/recorridos/{id}:
 *   get:
 *     summary: Consultar un recorrido por su ID
 *     tags: [Recorridos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador del recorrido
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Recorrido encontrado
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Recorrido no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', recorridoController.obtenerPorId);

/**
 * @swagger
 * /api/recorridos:
 *   post:
 *     summary: Registrar un punto dentro de un recorrido
 *     tags: [Recorridos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - IdPuntoIntermedio
 *               - IdRuta
 *               - Orden
 *             properties:
 *               IdPuntoIntermedio:
 *                 type: integer
 *                 example: 1
 *               IdRuta:
 *                 type: integer
 *                 example: 1
 *               Orden:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Punto agregado al recorrido correctamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', recorridoController.crear);

/**
 * @swagger
 * /api/recorridos/{id}/orden:
 *   patch:
 *     summary: Actualizar el orden de un punto del recorrido
 *     description: Modifica la posición de un punto dentro de una ruta.
 *     tags: [Recorridos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del recorrido que se desea modificar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Orden
 *             properties:
 *               Orden:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Orden actualizado correctamente
 *       400:
 *         description: ID u orden inválido
 *       404:
 *         description: Recorrido no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.patch('/:id/orden', recorridoController.actualizarOrden);

/**
 * @swagger
 * /api/recorridos/{id}/estado:
 *   patch:
 *     summary: Actualizar el estado de un recorrido
 *     description: Permite cambiar el estado entre Activo e Inactivo sin eliminar el registro.
 *     tags: [Recorridos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del recorrido que se desea actualizar
 *         schema:
 *           type: integer
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
 *                 enum:
 *                   - Activo
 *                   - Inactivo
 *                 example: Inactivo
 *     responses:
 *       200:
 *         description: Estado actualizado correctamente
 *       400:
 *         description: ID o estado inválido
 *       404:
 *         description: Recorrido no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.patch('/:id/estado', recorridoController.actualizarEstado);

module.exports = router;
