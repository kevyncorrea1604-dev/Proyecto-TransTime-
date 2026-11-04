
const Mantenimiento = require('../models/Mantenimiento');

// Validar los datos obligatorios del mantenimiento
function validarDatos(datos) {
    const { IdBuseta, Tipo, Fecha, Costo } = datos;

    if (
        IdBuseta === undefined ||
        IdBuseta === null ||
        IdBuseta === '' ||
        !Number.isInteger(Number(IdBuseta)) ||
        Number(IdBuseta) <= 0
    ) {
        return 'IdBuseta debe ser un entero positivo';
    }

    if (typeof Tipo !== 'string' || !Tipo.trim()) {
        return 'El tipo de mantenimiento es obligatorio';
    }

    if (typeof Fecha !== 'string' || !Fecha.trim() ||
        Number.isNaN(Date.parse(Fecha))) {
        return 'La fecha debe ser válida';
    }

    if (
        Costo !== undefined &&
        (Costo === '' || !Number.isFinite(Number(Costo)) || Number(Costo) < 0)
    ) {
        return 'El costo debe ser un número igual o mayor que cero';
    }

    return null;
}

// GET: consultar todos los mantenimientos
exports.obtenerTodos = (req, res) => {
    Mantenimiento.obtenerTodos((error, resultados) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al consultar los mantenimientos',
                error: error.message
            });
        }

        res.json(resultados);
    });
};

// GET: consultar un mantenimiento por ID
exports.obtenerPorId = (req, res) => {
    Mantenimiento.obtenerPorId(req.params.id, (error, resultados) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al consultar el mantenimiento',
                error: error.message
            });
        }

        if (resultados.length === 0) {
            return res.status(404).json({
                mensaje: 'Mantenimiento no encontrado'
            });
        }

        res.json(resultados[0]);
    });
};

// GET: consultar los mantenimientos de una buseta
exports.obtenerPorBuseta = (req, res) => {
    Mantenimiento.obtenerPorBuseta(
        req.params.idBuseta,
        (error, resultados) => {
            if (error) {
                return res.status(500).json({
                    mensaje: 'Error al consultar los mantenimientos de la buseta',
                    error: error.message
                });
            }

            res.json(resultados);
        }
    );
};

// POST: registrar un mantenimiento
exports.crear = (req, res) => {
    const errorValidacion = validarDatos(req.body);

    if (errorValidacion) {
        return res.status(400).json({
            mensaje: errorValidacion
        });
    }

    const datos = {
        IdBuseta: Number(req.body.IdBuseta),
        Tipo: req.body.Tipo.trim(),
        Fecha: req.body.Fecha,
        Descripcion: req.body.Descripcion ?? null,
        Costo: req.body.Costo === undefined
            ? 0
            : Number(req.body.Costo)
    };

    Mantenimiento.crear(datos, (error, resultado) => {
        if (error) {
            const esClaveForanea =
                error.code === 'ER_NO_REFERENCED_ROW_2';

            return res.status(esClaveForanea ? 400 : 500).json({
                mensaje: esClaveForanea
                    ? 'La buseta indicada no existe'
                    : 'Error al registrar el mantenimiento',
                error: error.message
            });
        }

        res.status(201).json({
            mensaje: 'Mantenimiento registrado correctamente',
            IdMantenimiento: resultado.insertId
        });
    });
};

// PUT: actualizar un mantenimiento
exports.actualizar = (req, res) => {
    const errorValidacion = validarDatos(req.body);

    if (errorValidacion) {
        return res.status(400).json({
            mensaje: errorValidacion
        });
    }

    if (
        req.body.Costo === undefined ||
        req.body.Costo === null
    ) {
        return res.status(400).json({
            mensaje: 'El costo es obligatorio al actualizar'
        });
    }

    const datos = {
        IdBuseta: Number(req.body.IdBuseta),
        Tipo: req.body.Tipo.trim(),
        Fecha: req.body.Fecha,
        Descripcion: req.body.Descripcion ?? null,
        Costo: Number(req.body.Costo)
    };

    // Verificar que el mantenimiento exista
    Mantenimiento.obtenerPorId(req.params.id, (error, resultados) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al consultar el mantenimiento',
                error: error.message
            });
        }

        if (resultados.length === 0) {
            return res.status(404).json({
                mensaje: 'Mantenimiento no encontrado'
            });
        }

        Mantenimiento.actualizar(
            req.params.id,
            datos,
            (errorActualizacion) => {
                if (errorActualizacion) {
                    return res.status(500).json({
                        mensaje: 'Error al actualizar el mantenimiento',
                        error: errorActualizacion.message
                    });
                }

                res.json({
                    mensaje: 'Mantenimiento actualizado correctamente'
                });
            }
        );
    });
};

// DELETE: eliminar un registro de mantenimiento
exports.eliminar = (req, res) => {
    Mantenimiento.obtenerPorId(req.params.id, (error, resultados) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al consultar el mantenimiento',
                error: error.message
            });
        }

        if (resultados.length === 0) {
            return res.status(404).json({
                mensaje: 'Mantenimiento no encontrado'
            });
        }

        Mantenimiento.eliminar(req.params.id, (errorEliminacion) => {
            if (errorEliminacion) {
                return res.status(500).json({
                    mensaje: 'Error al eliminar el mantenimiento',
                    error: errorEliminacion.message
                });
            }

            res.json({
                mensaje: 'Registro de mantenimiento eliminado correctamente'
            });
        });
    });
};