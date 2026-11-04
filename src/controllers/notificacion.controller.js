const Notificacion = require('../models/Notificacion');

// GET: consultar todas las notificaciones
exports.obtenerTodas = (req, res) => {
    Notificacion.obtenerTodas((error, resultados) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al consultar las notificaciones',
                error: error.message
            });
        }

        res.json(resultados);
    });
};

// GET: consultar una notificación por ID
exports.obtenerPorId = (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            mensaje: 'El ID de la notificación no es válido'
        });
    }

    Notificacion.obtenerPorId(id, (error, resultados) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al consultar la notificación',
                error: error.message
            });
        }

        if (resultados.length === 0) {
            return res.status(404).json({
                mensaje: 'Notificación no encontrada'
            });
        }

        res.json(resultados[0]);
    });
};

// GET: consultar notificaciones por usuario
exports.obtenerPorUsuario = (req, res) => {
    const idUsuario = Number(req.params.idUsuario);

    if (!Number.isInteger(idUsuario) || idUsuario <= 0) {
        return res.status(400).json({
            mensaje: 'El ID del usuario no es válido'
        });
    }

    Notificacion.obtenerPorUsuario(idUsuario, (error, resultados) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al consultar las notificaciones del usuario',
                error: error.message
            });
        }

        res.json(resultados);
    });
};

// POST: crear una notificación
exports.crear = (req, res) => {
    const { IdUsuario, Titulo, Mensaje } = req.body;

    if (
        !Number.isInteger(Number(IdUsuario)) ||
        Number(IdUsuario) <= 0 ||
        typeof Titulo !== 'string' ||
        !Titulo.trim() ||
        typeof Mensaje !== 'string' ||
        !Mensaje.trim()
    ) {
        return res.status(400).json({
            mensaje: 'Debes proporcionar IdUsuario, Titulo y Mensaje válidos'
        });
    }

    if (Titulo.trim().length > 150 || Mensaje.trim().length > 500) {
        return res.status(400).json({
            mensaje: 'El título admite máximo 150 caracteres y el mensaje 500'
        });
    }

    const notificacion = {
        IdUsuario: Number(IdUsuario),
        Titulo: Titulo.trim(),
        Mensaje: Mensaje.trim()
    };

    Notificacion.crear(notificacion, (error, resultado) => {
        if (error) {
            if (error.code === 'ER_NO_REFERENCED_ROW_2') {
                return res.status(400).json({
                    mensaje: 'El usuario indicado no existe'
                });
            }

            return res.status(500).json({
                mensaje: 'Error al crear la notificación',
                error: error.message
            });
        }

        res.status(201).json({
            mensaje: 'Notificación creada correctamente',
            IdNotificacion: resultado.insertId,
            IdUsuario: notificacion.IdUsuario,
            Titulo: notificacion.Titulo,
            Mensaje: notificacion.Mensaje,
            Leida: 0
        });
    });
};

// PATCH: marcar como leída o no leída
exports.actualizarLeida = (req, res) => {
    const id = Number(req.params.id);
    const { Leida } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            mensaje: 'El ID de la notificación no es válido'
        });
    }

    if (Leida !== 0 && Leida !== 1 &&
        Leida !== false && Leida !== true) {
        return res.status(400).json({
            mensaje: 'El campo Leida debe ser 0 o 1'
        });
    }

    const valorLeida = Number(Leida);

    Notificacion.actualizarLeida(id, valorLeida, (error, resultado) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al actualizar el estado de lectura',
                error: error.message
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: 'Notificación no encontrada'
            });
        }

        res.json({
            mensaje: valorLeida === 1
                ? 'Notificación marcada como leída'
                : 'Notificación marcada como no leída',
            IdNotificacion: id,
            Leida: valorLeida
        });
    });
};