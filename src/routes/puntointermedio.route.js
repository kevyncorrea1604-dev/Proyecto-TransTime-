
const express = require('express');
const router = express.Router();

const puntoController =
    require('../controllers/puntointermedio.controller');

/**
 * @swagger
 * tags:
 *   name: PuntosIntermedios
 *   description: Gestión de puntos intermedios de las rutas
 */

/**
 * @swagger
 * /api/puntos-intermedios:
 *   get:
 *     summary: Consultar todos los puntos intermedios
 *     tags: [PuntosIntermedios]
 *     responses:
 *       200:
 *         description: Lista de puntos intermedios
 */
router.get('/', puntoController.obtenerTodos);

/**
 * @swagger
 * /api/puntos-intermedios/ruta/{idRuta}:
 *   get:
 *     summary: Consultar puntos de una ruta
 *     tags: [PuntosIntermedios]
 *     parameters:
 *       - in: path
 *         name: idRuta
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Puntos de la ruta
 *       400:
 *         description: ID de ruta inválido
 */
router.get('/ruta/:idRuta', puntoController.obtenerPorRuta);

/**
 * @swagger
 * /api/puntos-intermedios/{id}:
 *   get:
 *     summary: Consultar un punto por ID
 *     tags: [PuntosIntermedios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Punto encontrado
 *       404:
 *         description: Punto no encontrado
 */
router.get('/:id', puntoController.obtenerPorId);

/**
 * @swagger
 * /api/puntos-intermedios:
 *   post:
 *     summary: Registrar un punto intermedio
 *     tags: [PuntosIntermedios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - IdRuta
 *               - Nombre
 *             properties:
 *               IdRuta:
 *                 type: integer
 *                 example: 1
 *               Nombre:
 *                 type: string
 *                 example: Parque Central
 *               Direccion:
 *                 type: string
 *                 nullable: true
 *                 example: Calle 10
 *               Latitud:
 *                 type: number
 *                 nullable: true
 *                 example: 4.4389
 *               Longitud:
 *                 type: number
 *                 nullable: true
 *                 example: -75.2322
 *               Estado:
 *                 type: string
 *                 enum: [Activo, Inactivo]
 *                 example: Activo
 *     responses:
 *       201:
 *         description: Punto registrado
 *       400:
 *         description: Datos inválidos
 */
router.post('/', puntoController.crear);

/**
 * @swagger
 * /api/puntos-intermedios/{id}:
 *   put:
 *     summary: Actualizar un punto intermedio
 *     tags: [PuntosIntermedios]
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
 *             required: [IdRuta, Nombre, Estado]
 *             properties:
 *               IdRuta:
 *                 type: integer
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
 *               Estado:
 *                 type: string
 *                 enum: [Activo, Inactivo]
 *     responses:
 *       200:
 *         description: Punto actualizado
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Punto no encontrado
 */
router.put('/:id', puntoController.actualizar);

/**
 * @swagger
 * /api/puntos-intermedios/{id}/estado:
 *   patch:
 *     summary: Cambiar el estado de un punto intermedio
 *     tags: [PuntosIntermedios]
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
 *             required: [Estado]
 *             properties:
 *               Estado:
 *                 type: string
 *                 enum: [Activo, Inactivo]
 *                 example: Inactivo
 *     responses:
 *       200:
 *         description: Estado actualizado
 *       400:
 *         description: Estado inválido
 *       404:
 *         description: Punto no encontrado
 */
router.patch('/:id/estado', puntoController.actualizarEstado);

module.exports = router;