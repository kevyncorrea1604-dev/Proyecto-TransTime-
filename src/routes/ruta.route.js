

const express = require('express');
const router = express.Router();

const rutaController = require('../controllers/ruta.controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     Ruta:
 *       type: object
 *       properties:
 *         IdRuta:
 *           type: integer
 *           example: 1
 *         NumeroRuta:
 *           type: string
 *           example: "R-101"
 *         Origen:
 *           type: string
 *           example: "Centro"
 *         Destino:
 *           type: string
 *           example: "Terminal"
 *         Estado:
 *           type: string
 *           enum: [Activa, Inactiva]
 *           example: Activa
 *         IdEmpresa:
 *           type: integer
 *           example: 1
 */

/**
 * @swagger
 * /api/rutas:
 *   get:
 *     summary: Consultar todas las rutas
 *     tags: [Rutas]
 *     responses:
 *       200:
 *         description: Lista de rutas consultada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ruta'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', rutaController.listar);

/**
 * @swagger
 * /api/rutas/{id}:
 *   get:
 *     summary: Consultar una ruta por su ID
 *     tags: [Rutas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identificador de la ruta
 *     responses:
 *       200:
 *         description: Ruta encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ruta'
 *       400:
 *         description: ID no válido
 *       404:
 *         description: Ruta no encontrada
 */
router.get('/:id', rutaController.buscarPorId);

/**
 * @swagger
 * /api/rutas:
 *   post:
 *     summary: Registrar una ruta
 *     tags: [Rutas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - NumeroRuta
 *               - Origen
 *               - Destino
 *               - IdEmpresa
 *             properties:
 *               NumeroRuta:
 *                 type: string
 *                 example: "R-101"
 *               Origen:
 *                 type: string
 *                 example: "Centro"
 *               Destino:
 *                 type: string
 *                 example: "Terminal"
 *               Estado:
 *                 type: string
 *                 enum: [Activa, Inactiva]
 *                 example: Activa
 *               IdEmpresa:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Ruta registrada correctamente
 *       400:
 *         description: Datos inválidos o empresa inexistente
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', rutaController.registrar);

/**
 * @swagger
 * /api/rutas/{id}:
 *   put:
 *     summary: Actualizar una ruta existente
 *     tags: [Rutas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identificador de la ruta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - NumeroRuta
 *               - Origen
 *               - Destino
 *               - Estado
 *               - IdEmpresa
 *             properties:
 *               NumeroRuta:
 *                 type: string
 *                 example: "R-101"
 *               Origen:
 *                 type: string
 *                 example: "Centro"
 *               Destino:
 *                 type: string
 *                 example: "Terminal"
 *               Estado:
 *                 type: string
 *                 enum: [Activa, Inactiva]
 *                 example: Activa
 *               IdEmpresa:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Ruta actualizada correctamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Ruta no encontrada
 */
router.put('/:id', rutaController.actualizar);

/**
 * @swagger
 * /api/rutas/{id}/estado:
 *   patch:
 *     summary: Cambiar el estado de una ruta
 *     tags: [Rutas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identificador de la ruta
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
 *                 enum: [Activa, Inactiva]
 *                 example: Inactiva
 *     responses:
 *       200:
 *         description: Estado actualizado correctamente
 *       400:
 *         description: ID o estado no válido
 *       404:
 *         description: Ruta no encontrada
 */
router.patch('/:id/estado', rutaController.cambiarEstado);

module.exports = router;
