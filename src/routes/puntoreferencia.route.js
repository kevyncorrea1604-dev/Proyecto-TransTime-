
const express = require('express');
const router = express.Router();

const puntoReferenciaController = require('../controllers/puntoreferencia.controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     PuntoReferencia:
 *       type: object
 *       properties:
 *         IdPuntoReferencia:
 *           type: integer
 *           example: 1
 *         Nombre:
 *           type: string
 *           example: Terminal de Transporte
 *         Direccion:
 *           type: string
 *           nullable: true
 *           example: Calle 20 # 10-30
 *         Latitud:
 *           type: number
 *           nullable: true
 *           example: 4.4389
 *         Longitud:
 *           type: number
 *           nullable: true
 *           example: -75.2322
 *         Estado:
 *           type: string
 *           enum: [Activo, Inactivo]
 *           example: Activo
 */

/**
 * @swagger
 * /api/puntos-referencia:
 *   get:
 *     summary: Consultar todos los puntos de referencia
 *     tags: [Puntos de referencia]
 *     responses:
 *       200:
 *         description: Lista de puntos de referencia
 */
router.get('/', puntoReferenciaController.obtenerTodos);

/**
 * @swagger
 * /api/puntos-referencia/{id}:
 *   get:
 *     summary: Consultar un punto de referencia por ID
 *     tags: [Puntos de referencia]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Punto de referencia encontrado
 *       404:
 *         description: Punto de referencia no encontrado
 */
router.get('/:id', puntoReferenciaController.obtenerPorId);

/**
 * @swagger
 * /api/puntos-referencia:
 *   post:
 *     summary: Crear un punto de referencia
 *     tags: [Puntos de referencia]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Nombre
 *             properties:
 *               Nombre:
 *                 type: string
 *               Direccion:
 *                 type: string
 *                 nullable: true
 *               Latitud:
 *                 type: number
 *                 nullable: true
 *               Longitud:
 *                 type: number
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Punto de referencia creado
 *       400:
 *         description: Datos inválidos
 */
router.post('/', puntoReferenciaController.crear);

/**
 * @swagger
 * /api/puntos-referencia/{id}:
 *   put:
 *     summary: Actualizar un punto de referencia
 *     tags: [Puntos de referencia]
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
 *             properties:
 *               Nombre:
 *                 type: string
 *               Direccion:
 *                 type: string
 *                 nullable: true
 *               Latitud:
 *                 type: number
 *                 nullable: true
 *               Longitud:
 *                 type: number
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Punto de referencia actualizado
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Punto de referencia no encontrado
 */
router.put('/:id', puntoReferenciaController.actualizar);

/**
 * @swagger
 * /api/puntos-referencia/{id}/estado:
 *   patch:
 *     summary: Activar o desactivar un punto de referencia
 *     tags: [Puntos de referencia]
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
 *         description: Punto de referencia no encontrado
 */
router.patch('/:id/estado', puntoReferenciaController.actualizarEstado);

module.exports = router;