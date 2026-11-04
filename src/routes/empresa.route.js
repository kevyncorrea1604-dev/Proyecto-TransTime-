const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresa.controller');

/**
 * @swagger
 * tags:
 *   name: Empresas
 *   description: Gestión de empresas de transporte
 */

/**
 * @swagger
 * /api/empresas:
 *   get:
 *     summary: Consultar todas las empresas
 *     tags: [Empresas]
 *     responses:
 *       200:
 *         description: Empresas consultadas correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', empresaController.obtenerTodas);

/**
 * @swagger
 * /api/empresas/{id}:
 *   get:
 *     summary: Consultar una empresa por ID
 *     tags: [Empresas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Empresa encontrada
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Empresa no encontrada
 */
router.get('/:id', empresaController.obtenerPorId);

/**
 * @swagger
 * /api/empresas:
 *   post:
 *     summary: Registrar una empresa
 *     tags: [Empresas]
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
 *                 maxLength: 150
 *                 example: Transporte Ibagué
 *               Telefono:
 *                 type: string
 *                 nullable: true
 *                 example: "6081234567"
 *               Direccion:
 *                 type: string
 *                 nullable: true
 *                 example: Calle 10 # 5-20
 *     responses:
 *       201:
 *         description: Empresa registrada correctamente
 *       400:
 *         description: Datos inválidos
 */
router.post('/', empresaController.crear);

/**
 * @swagger
 * /api/empresas/{id}:
 *   put:
 *     summary: Actualizar los datos de una empresa
 *     tags: [Empresas]
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
 *                 example: Transporte Ibagué
 *               Telefono:
 *                 type: string
 *                 nullable: true
 *                 example: "6081234567"
 *               Direccion:
 *                 type: string
 *                 nullable: true
 *                 example: Calle 10 # 5-20
 *     responses:
 *       200:
 *         description: Empresa actualizada correctamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Empresa no encontrada
 */
router.put('/:id', empresaController.actualizar);

/**
 * @swagger
 * /api/empresas/{id}/estado:
 *   patch:
 *     summary: Activar o desactivar una empresa
 *     tags: [Empresas]
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
 *         description: Empresa no encontrada
 */
router.patch('/:id/estado', empresaController.actualizarEstado);

module.exports = router;