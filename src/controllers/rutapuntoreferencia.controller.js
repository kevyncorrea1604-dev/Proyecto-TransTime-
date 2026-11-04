
const RutaPuntoReferencia = require('../models/RutaPuntoReferencia');

// Validar que los datos obligatorios sean enteros positivos
function datosValidos(datos) {
    const campos = [
        'IdRuta',
        'IdPuntoReferencia',
        'OrdenPuntoReferencia',
        'TiempoEstimado'
    ];

    for (const campo of campos) {
        if (
            datos[campo] === undefined ||
            datos[campo] === null ||
            datos[campo] === '' ||
            !Number.isInteger(Number(datos[campo]))
        ) {
            return false;
        }
    }

    return (
        Number(datos.IdRuta) > 0 &&
        Number(datos.IdPuntoReferencia) > 0 &&
        Number(datos.OrdenPuntoReferencia) > 0 &&
        Number(datos.TiempoEstimado) >= 0
    );
}

// GET: consultar todas las relaciones
exports.obtenerTodos = (req, res) => {
    RutaPuntoReferencia.obtenerTodos((error, resultados) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al consultar las relaciones',
                error: error.message
            });
        }

        res.json(resultados);
    });
};

// GET: consultar una relación por ID
exports.obtenerPorId = (req, res) => {
    RutaPuntoReferencia.obtenerPorId(req.params.id, (error, resultados) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al consultar la relación',
                error: error.message
            });
        }

        if (resultados.length === 0) {
            return res.status(404).json({
                mensaje: 'Relación entre ruta y punto no encontrada'
            });
        }

        res.json(resultados[0]);
    });
};

// GET: consultar los puntos de una ruta específica
exports.obtenerPorRuta = (req, res) => {
    RutaPuntoReferencia.obtenerPorRuta(
        req.params.idRuta,
        (error, resultados) => {
            if (error) {
                return res.status(500).json({
                    mensaje: 'Error al consultar los puntos de la ruta',
                    error: error.message
                });
            }

            res.json(resultados);
        }
    );
};

// POST: asociar un punto de referencia a una ruta
exports.crear = (req, res) => {
    const datos = req.body;

    if (!datosValidos(datos)) {
        return res.status(400).json({
            mensaje: 'Envía IdRuta, IdPuntoReferencia y OrdenPuntoReferencia como enteros positivos, y TiempoEstimado como entero no negativo'
        });
    }

    // Convertir los valores a números antes de guardarlos
    const datosNumericos = {
        IdRuta: Number(datos.IdRuta),
        IdPuntoReferencia: Number(datos.IdPuntoReferencia),
        OrdenPuntoReferencia: Number(datos.OrdenPuntoReferencia),
        TiempoEstimado: Number(datos.TiempoEstimado)
    };

    RutaPuntoReferencia.crear(datosNumericos, (error, resultado) => {
        if (error) {
            const esClaveForanea =
                error.code === 'ER_NO_REFERENCED_ROW_2';

            return res.status(esClaveForanea ? 400 : 500).json({
                mensaje: esClaveForanea
                    ? 'La ruta o el punto de referencia no existe'
                    : 'Error al asociar el punto con la ruta',
                error: error.message
            });
        }

        res.status(201).json({
            mensaje: 'Punto asociado a la ruta correctamente',
            IdRutaPuntoReferencia: resultado.insertId
        });
    });
};

// PUT: actualizar una relación existente
exports.actualizar = (req, res) => {
    const id = req.params.id;
    const datos = req.body;

    if (!datosValidos(datos)) {
        return res.status(400).json({
            mensaje: 'Los cuatro campos son obligatorios y deben contener valores enteros válidos'
        });
    }

    const datosNumericos = {
        IdRuta: Number(datos.IdRuta),
        IdPuntoReferencia: Number(datos.IdPuntoReferencia),
        OrdenPuntoReferencia: Number(datos.OrdenPuntoReferencia),
        TiempoEstimado: Number(datos.TiempoEstimado)
    };

    // Verificar primero que la relación exista
    RutaPuntoReferencia.obtenerPorId(id, (error, resultados) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al consultar la relación',
                error: error.message
            });
        }

        if (resultados.length === 0) {
            return res.status(404).json({
                mensaje: 'Relación entre ruta y punto no encontrada'
            });
        }

        RutaPuntoReferencia.actualizar(
            id,
            datosNumericos,
            (errorActualizacion) => {
                if (errorActualizacion) {
                    return res.status(500).json({
                        mensaje: 'Error al actualizar la relación',
                        error: errorActualizacion.message
                    });
                }

                res.json({
                    mensaje: 'Relación actualizada correctamente'
                });
            }
        );
    });
};

// DELETE: eliminar solamente la relación
exports.eliminar = (req, res) => {
    const id = req.params.id;

    // Verificar que la relación exista antes de eliminarla
    RutaPuntoReferencia.obtenerPorId(id, (error, resultados) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al consultar la relación',
                error: error.message
            });
        }

        if (resultados.length === 0) {
            return res.status(404).json({
                mensaje: 'Relación entre ruta y punto no encontrada'
            });
        }

        RutaPuntoReferencia.eliminar(id, (errorEliminacion) => {
            if (errorEliminacion) {
                return res.status(500).json({
                    mensaje: 'Error al eliminar la relación',
                    error: errorEliminacion.message
                });
            }

            res.json({
                mensaje: 'Relación eliminada correctamente'
            });
        });
    });
};