
const express = require('express');
const router = express.Router();

const controller = require('../controllers/incidente.controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     Incidente:
 *       type: object
 *       required:
 *         - IdRuta
 *         - Descripcion
 *       properties:
 *         IdIncidente:
 *           type: integer
 *           example: 1
 *         IdRuta:
 *           type: integer
 *           example: 2
 *         FechaInicio:
 *           type: string
 *           format: date-time
 *           example: "2026-10-28T09:00:00"
 *         FechaFin:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: "2026-10-28T10:00:00"
 *         Descripcion:
 *           type: string
 *           example: Retraso por cierre temporal de una vía
 *         Estado:
 *           type: string
 *           enum: [Activo, Inactivo]
 *           example: Activo
 */

/**
 * @swagger
 * /api/incidentes:
 *   get:
 *     summary: Consultar todos los incidentes
 *     tags: [Incidentes]
 *     responses:
 *       200:
 *         description: Lista de incidentes
 */
router.get('/', controller.obtenerTodos);

/**
 * @swagger
 * /api/incidentes/ruta/{idRuta}:
 *   get:
 *     summary: Consultar los incidentes de una ruta
 *     tags: [Incidentes]
 *     parameters:
 *       - in: path
 *         name: idRuta
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Incidentes de la ruta
 */
router.get('/ruta/:idRuta', controller.obtenerPorRuta);

/**
 * @swagger
 * /api/incidentes/{id}:
 *   get:
 *     summary: Consultar un incidente por ID
 *     tags: [Incidentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Incidente encontrado
 *       404:
 *         description: Incidente no encontrado
 */
router.get('/:id', controller.obtenerPorId);

/**
 * @swagger
 * /api/incidentes:
 *   post:
 *     summary: Registrar un incidente
 *     tags: [Incidentes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Incidente'
 *     responses:
 *       201:
 *         description: Incidente registrado
 *       400:
 *         description: Datos inválidos o ruta inexistente
 */
router.post('/', controller.crear);

/**
 * @swagger
 * /api/incidentes/{id}:
 *   put:
 *     summary: Actualizar un incidente
 *     tags: [Incidentes]
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
 *             $ref: '#/components/schemas/Incidente'
 *     responses:
 *       200:
 *         description: Incidente actualizado
 *       404:
 *         description: Incidente no encontrado
 */
router.put('/:id', controller.actualizar);

/**
 * @swagger
 * /api/incidentes/{id}/estado:
 *   patch:
 *     summary: Activar o desactivar un incidente
 *     description: Cambia el estado sin eliminar el registro.
 *     tags: [Incidentes]
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
 *     responses:
 *       200:
 *         description: Estado actualizado
 *       400:
 *         description: Estado inválido
 *       404:
 *         description: Incidente no encontrado
 */
router.patch('/:id/estado', controller.actualizarEstado);

module.exports = router;
