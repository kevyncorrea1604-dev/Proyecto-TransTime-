
const express = require('express');
const router = express.Router();

const busetaController = require('../controllers/buseta.controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     Buseta:
 *       type: object
 *       required:
 *         - IdRuta
 *         - IdEmpresa
 *         - IdConductor
 *         - Placa
 *         - NumeroInterno
 *       properties:
 *         IdBuseta:
 *           type: integer
 *           readOnly: true
 *           example: 1
 *         IdRuta:
 *           type: integer
 *           example: 1
 *         IdEmpresa:
 *           type: integer
 *           example: 1
 *         IdConductor:
 *           type: integer
 *           example: 1
 *         Placa:
 *           type: string
 *           example: IBG123
 *         NumeroInterno:
 *           type: string
 *           example: "101"
 *         Estado:
 *           type: string
 *           enum: [Activo, Inactivo]
 *           example: Activo
 */

/**
 * @swagger
 * /api/busetas:
 *   get:
 *     summary: Consultar todas las busetas
 *     tags: [Busetas]
 *     responses:
 *       200:
 *         description: Lista de busetas
 *       500:
 *         description: Error del servidor
 */
router.get('/', busetaController.listar);

/**
 * @swagger
 * /api/busetas/{id}:
 *   get:
 *     summary: Consultar una buseta por ID
 *     tags: [Busetas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Buseta encontrada
 *       404:
 *         description: Buseta no encontrada
 */
router.get('/:id', busetaController.buscarPorId);

/**
 * @swagger
 * /api/busetas:
 *   post:
 *     summary: Registrar una buseta
 *     tags: [Busetas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Buseta'
 *     responses:
 *       201:
 *         description: Buseta registrada
 *       400:
 *         description: Datos inválidos
 */
router.post('/', busetaController.registrar);

/**
 * @swagger
 * /api/busetas/{id}:
 *   put:
 *     summary: Actualizar una buseta
 *     tags: [Busetas]
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
 *             $ref: '#/components/schemas/Buseta'
 *     responses:
 *       200:
 *         description: Buseta actualizada
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Buseta no encontrada
 */
router.put('/:id', busetaController.actualizar);

/**
 * @swagger
 * /api/busetas/{id}/estado:
 *   patch:
 *     summary: Cambiar el estado de una buseta
 *     tags: [Busetas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identificador de la buseta
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
 *         description: Buseta no encontrada
 */
router.patch('/:id/estado', busetaController.cambiarEstado);

module.exports = router;
