const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gestión de usuarios de TRANSTIME
 */

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Consultar todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios sin contraseñas
 *       500:
 *         description: Error del servidor
 */
router.get('/', usuarioController.obtenerTodos);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Consultar un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id', usuarioController.obtenerPorId);

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Registrar un usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Nombre
 *               - CorreoElectronico
 *               - Contrasena
 *             properties:
 *               Nombre:
 *                 type: string
 *                 example: Carlos Pérez
 *               CorreoElectronico:
 *                 type: string
 *                 example: carlos@example.com
 *               Contrasena:
 *                 type: string
 *                 format: password
 *                 example: MiClaveSegura123
 *               Telefono:
 *                 type: string
 *                 nullable: true
 *                 example: "3001234567"
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *       400:
 *         description: Datos inválidos
 *       409:
 *         description: Correo electrónico duplicado
 */
router.post('/', usuarioController.crear);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualizar los datos básicos de un usuario
 *     tags: [Usuarios]
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
 *               - CorreoElectronico
 *             properties:
 *               Nombre:
 *                 type: string
 *                 example: Carlos Pérez
 *               CorreoElectronico:
 *                 type: string
 *                 example: carlos@example.com
 *               Telefono:
 *                 type: string
 *                 nullable: true
 *                 example: "3001234567"
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Usuario no encontrado
 *       409:
 *         description: Correo electrónico duplicado
 */
router.put('/:id', usuarioController.actualizar);

module.exports = router;