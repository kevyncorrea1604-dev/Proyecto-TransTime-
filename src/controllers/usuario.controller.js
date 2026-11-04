const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

// GET: consultar todos los usuarios
exports.obtenerTodos = (req, res) => {
    Usuario.obtenerTodos((error, resultados) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al consultar los usuarios'
            });
        }

        res.json(resultados);
    });
};

// GET: consultar un usuario por ID
exports.obtenerPorId = (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            mensaje: 'El ID del usuario no es válido'
        });
    }

    Usuario.obtenerPorId(id, (error, resultados) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al consultar el usuario'
            });
        }

        if (resultados.length === 0) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });
        }

        res.json(resultados[0]);
    });
};

// POST: registrar un usuario
exports.crear = async (req, res) => {
    const { Nombre, CorreoElectronico, Contrasena, Telefono } = req.body;

    if (
        typeof Nombre !== 'string' ||
        !Nombre.trim() ||
        typeof CorreoElectronico !== 'string' ||
        !CorreoElectronico.trim() ||
        typeof Contrasena !== 'string' ||
        Contrasena.length < 8
    ) {
        return res.status(400).json({
            mensaje: 'Nombre y correo son obligatorios; la contraseña debe tener al menos 8 caracteres'
        });
    }

    if (Nombre.trim().length > 100 ||
        CorreoElectronico.trim().length > 150 ||
        (Telefono != null &&
            (typeof Telefono !== 'string' || Telefono.length > 20))) {
        return res.status(400).json({
            mensaje: 'Uno o más campos superan la longitud permitida'
        });
    }

    const correo = CorreoElectronico.trim().toLowerCase();
    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoCorreo.test(correo)) {
        return res.status(400).json({
            mensaje: 'El correo electrónico no tiene un formato válido'
        });
    }

    try {
        const hash = await bcrypt.hash(Contrasena, 10);

        const usuario = {
            Nombre: Nombre.trim(),
            CorreoElectronico: correo,
            ContrasenaHash: hash,
            Telefono: Telefono?.trim() || null
        };

        Usuario.crear(usuario, (error, resultado) => {
            if (error) {
                if (error.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({
                        mensaje: 'Ya existe un usuario con ese correo electrónico'
                    });
                }

                if (error.code === 'ER_NO_REFERENCED_ROW_2') {
                    return res.status(400).json({
                        mensaje: 'No se pudo registrar el usuario por una referencia inválida'
                    });
                }

                return res.status(500).json({
                    mensaje: 'Error al registrar el usuario'
                });
            }

            res.status(201).json({
                mensaje: 'Usuario registrado correctamente',
                usuario: {
                    IdUsuario: resultado.insertId,
                    Nombre: usuario.Nombre,
                    CorreoElectronico: usuario.CorreoElectronico,
                    Telefono: usuario.Telefono
                }
            });
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al procesar la contraseña'
        });
    }
};

// PUT: actualizar datos básicos del usuario
exports.actualizar = (req, res) => {
    const id = Number(req.params.id);
    const { Nombre, CorreoElectronico, Telefono } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            mensaje: 'El ID del usuario no es válido'
        });
    }

    if (
        typeof Nombre !== 'string' ||
        !Nombre.trim() ||
        typeof CorreoElectronico !== 'string' ||
        !CorreoElectronico.trim()
    ) {
        return res.status(400).json({
            mensaje: 'Nombre y correo electrónico son obligatorios'
        });
    }

    if (
        Nombre.trim().length > 100 ||
        CorreoElectronico.trim().length > 150 ||
        (Telefono != null &&
            (typeof Telefono !== 'string' || Telefono.length > 20))
    ) {
        return res.status(400).json({
            mensaje: 'Uno o más campos superan la longitud permitida'
        });
    }

    const correo = CorreoElectronico.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        return res.status(400).json({
            mensaje: 'El correo electrónico no tiene un formato válido'
        });
    }

    const usuario = {
        Nombre: Nombre.trim(),
        CorreoElectronico: correo,
        Telefono: Telefono?.trim() || null
    };

    Usuario.actualizar(id, usuario, (error, resultado) => {
        if (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({
                    mensaje: 'Ese correo electrónico ya está registrado'
                });
            }

            return res.status(500).json({
                mensaje: 'Error al actualizar el usuario'
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado o sin cambios'
            });
        }

        res.json({
            mensaje: 'Usuario actualizado correctamente',
            IdUsuario: id,
            ...usuario
        });
    });
};