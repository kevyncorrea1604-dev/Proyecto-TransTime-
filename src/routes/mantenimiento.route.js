
const express = require('express');
const router = express.Router();

const controller = require('../controllers/mantenimiento.controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     Mantenimiento:
 *       type: object
 *       required:
 *         - IdBuseta
 *         - Tipo
 *         - Fecha
 *       properties:
 *         IdMantenimiento:
 *           type: integer
 *           example: 1
 *         IdBuseta:
 *           type: integer
 *           example: 2
 *         Tipo:
 *           type: string
 *           example: Mantenimiento preventivo
 *         Fecha:
 *           type: string
 *           format: date-time
 *           example: "2026-10-28T09:00:00"
 *         Descripcion:
 *           type: string
 *           nullable: true
 *           example: Cambio de aceite y revisión de frenos
 *         Costo:
 *           type: number
 *           example: 150000
 */

/**
 * @swagger
 * /api/mantenimientos:
 *   get:
 *     summary: Consultar todos los mantenimientos
 *     tags: [Mantenimientos]
 *     responses:
 *       200:
 *         description: Lista de mantenimientos
 */
router.get('/', controller.obtenerTodos);

/**
 * @swagger
 * /api/mantenimientos/buseta/{idBuseta}:
 *   get:
 *     summary: Consultar los mantenimientos de una buseta
 *     tags: [Mantenimientos]
 *     parameters:
 *       - in: path
 *         name: idBuseta
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de mantenimientos de la buseta
 */
router.get('/buseta/:idBuseta', controller.obtenerPorBuseta);

/**
 * @swagger
 * /api/mantenimientos/{id}:
 *   get:
 *     summary: Consultar un mantenimiento por ID
 *     tags: [Mantenimientos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Mantenimiento encontrado
 *       404:
 *         description: Mantenimiento no encontrado
 */
router.get('/:id', controller.obtenerPorId);

/**
 * @swagger
 * /api/mantenimientos:
 *   post:
 *     summary: Registrar un mantenimiento
 *     tags: [Mantenimientos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Mantenimiento'
 *     responses:
 *       201:
 *         description: Mantenimiento registrado
 *       400:
 *         description: Datos inválidos o buseta inexistente
 */
router.post('/', controller.crear);

/**
 * @swagger
 * /api/mantenimientos/{id}:
 *   put:
 *     summary: Actualizar un mantenimiento
 *     tags: [Mantenimientos]
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
 *             $ref: '#/components/schemas/Mantenimiento'
 *     responses:
 *       200:
 *         description: Mantenimiento actualizado
 *       404:
 *         description: Mantenimiento no encontrado
 */
router.put('/:id', controller.actualizar);

/**
 * @swagger
 * /api/mantenimientos/{id}:
 *   delete:
 *     summary: Eliminar un registro de mantenimiento
 *     description: Elimina físicamente el registro de mantenimiento.
 *     tags: [Mantenimientos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro eliminado
 *       404:
 *         description: Mantenimiento no encontrado
 */
router.delete('/:id', controller.eliminar);

module.exports = router;
