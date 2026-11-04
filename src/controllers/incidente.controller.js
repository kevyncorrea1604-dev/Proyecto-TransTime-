
const Incidente = require('../models/Incidente');

// Validar los datos necesarios para registrar o actualizar
function validarDatos(datos, esActualizacion = false) {
    const { IdRuta, FechaInicio, FechaFin, Descripcion } = datos;

    if (
        IdRuta === undefined ||
        IdRuta === null ||
        IdRuta === '' ||
        !Number.isInteger(Number(IdRuta)) ||
        Number(IdRuta) <= 0
    ) {
        return 'IdRuta debe ser un entero positivo';
    }

    if (typeof Descripcion !== 'string' || !Descripcion.trim()) {
        return 'La descripción del incidente es obligatoria';
    }

    // En una actualización, la fecha de inicio es obligatoria.
    if (
        esActualizacion &&
        (typeof FechaInicio !== 'string' ||
         !FechaInicio.trim() ||
         Number.isNaN(Date.parse(FechaInicio)))
    ) {
        return 'La fecha de inicio debe ser válida';
    }

    // Si se proporciona una fecha de inicio al crear, debe ser válida.
    if (
        FechaInicio != null &&
        (typeof FechaInicio !== 'string' ||
         !FechaInicio.trim() ||
         Number.isNaN(Date.parse(FechaInicio)))
    ) {
        return 'La fecha de inicio debe ser válida';
    }

    // La fecha de finalización es opcional, pero debe ser válida si se envía.
    if (
        FechaFin != null &&
        (typeof FechaFin !== 'string' ||
         !FechaFin.trim() ||
         Number.isNaN(Date.parse(FechaFin)))
    ) {
        return 'La fecha de finalización debe ser válida';
    }

    if (
        FechaInicio != null &&
        FechaFin != null &&
        new Date(FechaFin) < new Date(FechaInicio)
    ) {
        return 'La fecha de finalización no puede ser anterior a la fecha de inicio';
    }

    return null;
}

// GET: consultar todos los incidentes
exports.obtenerTodos = (req, res) => {
    Incidente.obtenerTodos((error, resultados) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al consultar los incidentes',
                error: error.message
            });
        }

        res.json(resultados);
    });
};

// GET: consultar un incidente por ID
exports.obtenerPorId = (req, res) => {
    Incidente.obtenerPorId(req.params.id, (error, resultados) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al consultar el incidente',
                error: error.message
            });
        }

        if (resultados.length === 0) {
            return res.status(404).json({
                mensaje: 'Incidente no encontrado'
            });
        }

        res.json(resultados[0]);
    });
};

// GET: consultar los incidentes de una ruta
exports.obtenerPorRuta = (req, res) => {
    Incidente.obtenerPorRuta(req.params.idRuta, (error, resultados) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al consultar los incidentes de la ruta',
                error: error.message
            });
        }

        res.json(resultados);
    });
};

// POST: registrar un incidente
exports.crear = (req, res) => {
    const errorValidacion = validarDatos(req.body);

    if (errorValidacion) {
        return res.status(400).json({
            mensaje: errorValidacion
        });
    }

    const datos = {
        IdRuta: Number(req.body.IdRuta),
        FechaInicio: req.body.FechaInicio ?? null,
        FechaFin: req.body.FechaFin ?? null,
        Descripcion: req.body.Descripcion.trim()
    };

    Incidente.crear(datos, (error, resultado) => {
        if (error) {
            const esClaveForanea =
                error.code === 'ER_NO_REFERENCED_ROW_2';

            return res.status(esClaveForanea ? 400 : 500).json({
                mensaje: esClaveForanea
                    ? 'La ruta indicada no existe'
                    : 'Error al registrar el incidente',
                error: error.message
            });
        }

        res.status(201).json({
            mensaje: 'Incidente registrado correctamente',
            IdIncidente: resultado.insertId
        });
    });
};

// PUT: actualizar los datos de un incidente
exports.actualizar = (req, res) => {
    const errorValidacion = validarDatos(req.body, true);

    if (errorValidacion) {
        return res.status(400).json({
            mensaje: errorValidacion
        });
    }

    const datos = {
        IdRuta: Number(req.body.IdRuta),
        FechaInicio: req.body.FechaInicio,
        FechaFin: req.body.FechaFin ?? null,
        Descripcion: req.body.Descripcion.trim()
    };

    // Verificar que el incidente exista antes de actualizarlo
    Incidente.obtenerPorId(req.params.id, (error, resultados) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al consultar el incidente',
                error: error.message
            });
        }

        if (resultados.length === 0) {
            return res.status(404).json({
                mensaje: 'Incidente no encontrado'
            });
        }

        Incidente.actualizar(req.params.id, datos, (errorActualizacion) => {
            if (errorActualizacion) {
                return res.status(500).json({
                    mensaje: 'Error al actualizar el incidente',
                    error: errorActualizacion.message
                });
            }

            res.json({
                mensaje: 'Incidente actualizado correctamente'
            });
        });
    });
};

// PATCH: cambiar el estado sin eliminar el incidente
exports.actualizarEstado = (req, res) => {
    const id = req.params.id;
    const { Estado } = req.body;

    if (!['Activo', 'Inactivo'].includes(Estado)) {
        return res.status(400).json({
            mensaje: 'El estado debe ser Activo o Inactivo'
        });
    }

    Incidente.obtenerPorId(id, (error, resultados) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al consultar el incidente',
                error: error.message
            });
        }

        if (resultados.length === 0) {
            return res.status(404).json({
                mensaje: 'Incidente no encontrado'
            });
        }

        Incidente.actualizarEstado(id, Estado, (errorActualizacion) => {
            if (errorActualizacion) {
                return res.status(500).json({
                    mensaje: 'Error al cambiar el estado del incidente',
                    error: errorActualizacion.message
                });
            }

            res.json({
                mensaje: `Incidente actualizado a estado ${Estado}`
            });
        });
    });
};
