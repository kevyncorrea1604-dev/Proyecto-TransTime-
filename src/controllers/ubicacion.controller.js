
const Ubicacion = require('../models/Ubicacion');

function esIdValido(valor) {
    return Number.isInteger(Number(valor)) && Number(valor) > 0;
}

function validarCoordenadas(latitud, longitud) {
    if (
        latitud === undefined ||
        longitud === undefined ||
        latitud === null ||
        longitud === null ||
        latitud === '' ||
        longitud === '' ||
        !Number.isFinite(Number(latitud)) ||
        !Number.isFinite(Number(longitud))
    ) {
        return false;
    }

    return (
        Number(latitud) >= -90 &&
        Number(latitud) <= 90 &&
        Number(longitud) >= -180 &&
        Number(longitud) <= 180
    );
}

// GET: Consultar todas las ubicaciones
exports.obtenerTodas = (req, res) => {
    Ubicacion.obtenerTodas((error, resultados) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al consultar las ubicaciones.'
            });
        }

        res.json(resultados);
    });
};

// GET: Consultar una ubicación por ID
exports.obtenerPorId = (req, res) => {
    const { id } = req.params;

    if (!esIdValido(id)) {
        return res.status(400).json({
            mensaje: 'El ID de la ubicación debe ser un entero positivo.'
        });
    }

    Ubicacion.obtenerPorId(id, (error, resultados) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al consultar la ubicación.'
            });
        }

        if (resultados.length === 0) {
            return res.status(404).json({
                mensaje: 'Ubicación no encontrada.'
            });
        }

        res.json(resultados[0]);
    });
};

// GET: Consultar ubicaciones de una buseta
exports.obtenerPorBuseta = (req, res) => {
    const { idBuseta } = req.params;

    if (!esIdValido(idBuseta)) {
        return res.status(400).json({
            mensaje: 'El ID de la buseta debe ser un entero positivo.'
        });
    }

    Ubicacion.obtenerPorBuseta(idBuseta, (error, resultados) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al consultar las ubicaciones de la buseta.'
            });
        }

        res.json(resultados);
    });
};

// POST: Registrar una ubicación
exports.crear = (req, res) => {
    const { IdBuseta, Latitud, Longitud } = req.body;

    if (!esIdValido(IdBuseta)) {
        return res.status(400).json({
            mensaje: 'IdBuseta es obligatorio y debe ser un entero positivo.'
        });
    }

    if (!validarCoordenadas(Latitud, Longitud)) {
        return res.status(400).json({
            mensaje: 'Las coordenadas son obligatorias y deben estar dentro de los rangos válidos.'
        });
    }

    const datos = {
        IdBuseta: Number(IdBuseta),
        Latitud: Number(Latitud),
        Longitud: Number(Longitud)
    };

    Ubicacion.crear(datos, (error, resultado) => {
        if (error) {
            if (error.code === 'ER_NO_REFERENCED_ROW_2') {
                return res.status(400).json({
                    mensaje: 'La buseta indicada no existe.'
                });
            }

            return res.status(500).json({
                mensaje: 'Error al registrar la ubicación.'
            });
        }

        res.status(201).json({
            mensaje: 'Ubicación registrada correctamente.',
            IdUbicacion: resultado.insertId,
            ...datos
        });
    });
};

// PUT: Actualizar una ubicación existente
exports.actualizar = (req, res) => {
    const { id } = req.params;
    const { IdBuseta, Latitud, Longitud } = req.body;

    if (!esIdValido(id)) {
        return res.status(400).json({
            mensaje: 'El ID de la ubicación debe ser un entero positivo.'
        });
    }

    if (!esIdValido(IdBuseta)) {
        return res.status(400).json({
            mensaje: 'IdBuseta es obligatorio y debe ser un entero positivo.'
        });
    }

    if (!validarCoordenadas(Latitud, Longitud)) {
        return res.status(400).json({
            mensaje: 'Las coordenadas son obligatorias y deben estar dentro de los rangos válidos.'
        });
    }

    const datos = {
        IdBuseta: Number(IdBuseta),
        Latitud: Number(Latitud),
        Longitud: Number(Longitud)
    };

    Ubicacion.actualizar(id, datos, (error, resultado) => {
        if (error) {
            if (error.code === 'ER_NO_REFERENCED_ROW_2') {
                return res.status(400).json({
                    mensaje: 'La buseta indicada no existe.'
                });
            }

            return res.status(500).json({
                mensaje: 'Error al actualizar la ubicación.'
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: 'Ubicación no encontrada o sin cambios.'
            });
        }

        res.json({
            mensaje: 'Ubicación actualizada correctamente.'
        });
    });
};