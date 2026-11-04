
const HistorialRuta = require('../models/HistorialRuta');

function esIdValido(valor) {
    return Number.isInteger(Number(valor)) && Number(valor) > 0;
}

// GET: Consultar todo el historial
exports.obtenerTodos = (req, res) => {
    HistorialRuta.obtenerTodos((error, resultados) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al consultar el historial de rutas.'
            });
        }

        res.json(resultados);
    });
};

// GET: Consultar un registro por ID
exports.obtenerPorId = (req, res) => {
    const { id } = req.params;

    if (!esIdValido(id)) {
        return res.status(400).json({
            mensaje: 'El ID debe ser un entero positivo.'
        });
    }

    HistorialRuta.obtenerPorId(id, (error, resultados) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al consultar el registro del historial.'
            });
        }

        if (resultados.length === 0) {
            return res.status(404).json({
                mensaje: 'Registro del historial no encontrado.'
            });
        }

        res.json(resultados[0]);
    });
};

// GET: Consultar el historial de un usuario
exports.obtenerPorUsuario = (req, res) => {
    const { idUsuario } = req.params;

    if (!esIdValido(idUsuario)) {
        return res.status(400).json({
            mensaje: 'El ID del usuario debe ser un entero positivo.'
        });
    }

    HistorialRuta.obtenerPorUsuario(idUsuario, (error, resultados) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al consultar el historial del usuario.'
            });
        }

        res.json(resultados);
    });
};

// POST: Registrar una ruta consultada
exports.crear = (req, res) => {
    const { IdUsuario, IdRuta, Estado } = req.body;

    if (!esIdValido(IdUsuario) || !esIdValido(IdRuta)) {
        return res.status(400).json({
            mensaje: 'IdUsuario e IdRuta son obligatorios y deben ser enteros positivos.'
        });
    }

    if (
        Estado !== undefined &&
        (typeof Estado !== 'string' || Estado.trim() === '' || Estado.length > 30)
    ) {
        return res.status(400).json({
            mensaje: 'Estado debe ser un texto de máximo 30 caracteres.'
        });
    }

    const datos = {
        IdUsuario: Number(IdUsuario),
        IdRuta: Number(IdRuta),
        Estado: Estado === undefined ? 'Consultada' : Estado.trim()
    };

    HistorialRuta.crear(datos, (error, resultado) => {
        if (error) {
            if (error.code === 'ER_NO_REFERENCED_ROW_2') {
                return res.status(400).json({
                    mensaje: 'El usuario o la ruta indicada no existe.'
                });
            }

            return res.status(500).json({
                mensaje: 'Error al registrar la ruta en el historial.'
            });
        }

        res.status(201).json({
            mensaje: 'Ruta registrada en el historial correctamente.',
            IdHistorialRuta: resultado.insertId,
            ...datos
        });
    });
};

// PATCH: Actualizar el estado del historial
exports.actualizarEstado = (req, res) => {
    const { id } = req.params;
    const { Estado } = req.body;

    if (!esIdValido(id)) {
        return res.status(400).json({
            mensaje: 'El ID debe ser un entero positivo.'
        });
    }

    if (
        typeof Estado !== 'string' ||
        Estado.trim() === '' ||
        Estado.trim().length > 30
    ) {
        return res.status(400).json({
            mensaje: 'Estado es obligatorio y debe tener máximo 30 caracteres.'
        });
    }

    HistorialRuta.actualizarEstado(id, Estado.trim(), (error, resultado) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al actualizar el estado del historial.'
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: 'Registro no encontrado o el estado no tuvo cambios.'
            });
        }

        res.json({
            mensaje: 'Estado del historial actualizado correctamente.'
        });
    });
};
