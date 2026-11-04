
const express = require('express');
const router = express.Router();
const conductorController = require('../controllers/conductor.controller');

/**
 * @swagger
 * tags:
 *   name: Conductores
 *   description: Gestión de conductores de TRANSTIME
 */

/**
 * @swagger
 * /api/conductores:
 *   get:
 *     summary: Consultar todos los conductores
 *     tags: [Conductores]
 *     responses:
 *       200:
 *         description: Conductores consultados correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', conductorController.obtenerTodos);

/**
 * @swagger
 * /api/conductores/{id}:
 *   get:
 *     summary: Consultar un conductor por ID
 *     tags: [Conductores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Conductor encontrado
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Conductor no encontrado
 */
router.get('/:id', conductorController.obtenerPorId);

/**
 * @swagger
 * /api/conductores:
 *   post:
 *     summary: Registrar un conductor
 *     tags: [Conductores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Nombre
 *               - Documento
 *             properties:
 *               Nombre:
 *                 type: string
 *                 maxLength: 150
 *                 example: Carlos Ramírez
 *               Documento:
 *                 type: string
 *                 maxLength: 20
 *                 example: DOC1001
 *               Telefono:
 *                 type: string
 *                 maxLength: 20
 *                 nullable: true
 *                 example: "3001234567"
 *     responses:
 *       201:
 *         description: Conductor registrado correctamente
 *       400:
 *         description: Datos inválidos
 *       409:
 *         description: Documento duplicado
 */
router.post('/', conductorController.crear);

/**
 * @swagger
 * /api/conductores/{id}:
 *   put:
 *     summary: Actualizar los datos de un conductor
 *     tags: [Conductores]
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
 *               - Nombre
 *               - Documento
 *             properties:
 *               Nombre:
 *                 type: string
 *                 example: Carlos Ramírez
 *               Documento:
 *                 type: string
 *                 example: DOC1001
 *               Telefono:
 *                 type: string
 *                 nullable: true
 *                 example: "3001234567"
 *     responses:
 *       200:
 *         description: Datos actualizados correctamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Conductor no encontrado
 *       409:
 *         description: Documento duplicado
 */
router.put('/:id', conductorController.actualizar);

/**
 * @swagger
 * /api/conductores/{id}/estado:
 *   patch:
 *     summary: Activar o desactivar un conductor
 *     description: Cambia el estado sin eliminar el registro.
 *     tags: [Conductores]
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
 *               - Estado
 *             properties:
 *               Estado:
 *                 type: string
 *                 enum: [Activo, Inactivo]
 *                 example: Inactivo
 *     responses:
 *       200:
 *         description: Estado actualizado correctamente
 *       400:
 *         description: ID o estado inválido
 *       404:
 *         description: Conductor no encontrado
 */
router.patch('/:id/estado', conductorController.actualizarEstado);

module.exports = router;
