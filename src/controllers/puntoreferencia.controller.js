
const PuntoReferencia = require('../models/PuntoReferencia');

// GET: consultar todos los puntos de referencia
exports.obtenerTodos = (req, res) => {
    PuntoReferencia.obtenerTodos((error, resultados) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al consultar los puntos de referencia',
                error: error.message
            });
        }

        res.json(resultados);
    });
};

// GET: consultar un punto de referencia por ID
exports.obtenerPorId = (req, res) => {
    const id = req.params.id;

    PuntoReferencia.obtenerPorId(id, (error, resultados) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al consultar el punto de referencia',
                error: error.message
            });
        }

        if (resultados.length === 0) {
            return res.status(404).json({
                mensaje: 'Punto de referencia no encontrado'
            });
        }

        res.json(resultados[0]);
    });
};

// POST: crear un punto de referencia
exports.crear = (req, res) => {
    const { Nombre, Direccion, Latitud, Longitud } = req.body;

    // El nombre es obligatorio
    if (!Nombre || !Nombre.trim()) {
        return res.status(400).json({
            mensaje: 'El nombre del punto de referencia es obligatorio'
        });
    }

    // Validar que las coordenadas sean números válidos
    if (
        (Latitud != null &&
            (Latitud === '' || !Number.isFinite(Number(Latitud)) ||
             Number(Latitud) < -90 || Number(Latitud) > 90)) ||
        (Longitud != null &&
            (Longitud === '' || !Number.isFinite(Number(Longitud)) ||
             Number(Longitud) < -180 || Number(Longitud) > 180))
    ) {
        return res.status(400).json({
            mensaje: 'Las coordenadas deben ser números válidos dentro de sus rangos'
        });
    }

    const datos = {
        Nombre: Nombre.trim(),
        Direccion,
        Latitud: Latitud == null ? null : Number(Latitud),
        Longitud: Longitud == null ? null : Number(Longitud)
    };

    PuntoReferencia.crear(datos, (error, resultado) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al crear el punto de referencia',
                error: error.message
            });
        }

        res.status(201).json({
            mensaje: 'Punto de referencia creado correctamente',
            IdPuntoReferencia: resultado.insertId
        });
    });
};

// PUT: actualizar los datos de un punto de referencia
exports.actualizar = (req, res) => {
    const id = req.params.id;
    const { Nombre, Direccion, Latitud, Longitud } = req.body;

    if (!Nombre || !Nombre.trim()) {
        return res.status(400).json({
            mensaje: 'El nombre del punto de referencia es obligatorio'
        });
    }

    if (
        (Latitud != null &&
            (Latitud === '' || !Number.isFinite(Number(Latitud)) ||
             Number(Latitud) < -90 || Number(Latitud) > 90)) ||
        (Longitud != null &&
            (Longitud === '' || !Number.isFinite(Number(Longitud)) ||
             Number(Longitud) < -180 || Number(Longitud) > 180))
    ) {
        return res.status(400).json({
            mensaje: 'Las coordenadas deben ser números válidos dentro de sus rangos'
        });
    }

    const datos = {
        Nombre: Nombre.trim(),
        Direccion,
        Latitud: Latitud == null ? null : Number(Latitud),
        Longitud: Longitud == null ? null : Number(Longitud)
    };

    PuntoReferencia.actualizar(id, datos, (error, resultado) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al actualizar el punto de referencia',
                error: error.message
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: 'Punto de referencia no encontrado'
            });
        }

        res.json({
            mensaje: 'Punto de referencia actualizado correctamente'
        });
    });
};

// PATCH: activar o desactivar un punto de referencia
exports.actualizarEstado = (req, res) => {
    const id = req.params.id;
    const { Estado } = req.body;

    // Solo se permiten estos dos estados
    if (!['Activo', 'Inactivo'].includes(Estado)) {
        return res.status(400).json({
            mensaje: 'El estado debe ser Activo o Inactivo'
        });
    }

    PuntoReferencia.actualizarEstado(id, Estado, (error, resultado) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al cambiar el estado',
                error: error.message
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: 'Punto de referencia no encontrado'
            });
        }

        res.json({
            mensaje: `Punto de referencia actualizado a ${Estado}`
        });
    });
};