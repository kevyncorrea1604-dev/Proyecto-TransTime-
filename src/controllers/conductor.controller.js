
const Conductor = require('../models/Conductor');

// GET: consultar todos los conductores
exports.obtenerTodos = async (req, res) => {
    try {
        const conductores = await Conductor.obtenerTodos();

        res.status(200).json({
            mensaje: 'Conductores consultados correctamente',
            datos: conductores
        });
    } catch (error) {
        console.error('Error al consultar conductores:', error);
        res.status(500).json({
            mensaje: 'Error interno al consultar los conductores'
        });
    }
};

// GET: consultar un conductor por ID
exports.obtenerPorId = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                mensaje: 'El ID debe ser un entero positivo'
            });
        }

        const conductor = await Conductor.obtenerPorId(id);

        if (!conductor) {
            return res.status(404).json({
                mensaje: 'Conductor no encontrado'
            });
        }

        res.status(200).json({ datos: conductor });
    } catch (error) {
        console.error('Error al consultar conductor:', error);
        res.status(500).json({
            mensaje: 'Error interno al consultar el conductor'
        });
    }
};

// POST: registrar un conductor
exports.crear = async (req, res) => {
    try {
        const { Nombre, Documento, Telefono } = req.body;

        if (
            typeof Nombre !== 'string' ||
            !Nombre.trim() ||
            typeof Documento !== 'string' ||
            !Documento.trim()
        ) {
            return res.status(400).json({
                mensaje: 'Nombre y Documento son obligatorios'
            });
        }

        if (Nombre.trim().length > 150 || Documento.trim().length > 20) {
            return res.status(400).json({
                mensaje: 'Nombre o Documento superan la longitud permitida'
            });
        }

        if (
            Telefono != null &&
            (typeof Telefono !== 'string' || Telefono.length > 20)
        ) {
            return res.status(400).json({
                mensaje: 'El teléfono debe ser texto de máximo 20 caracteres'
            });
        }

        const nuevoConductor = await Conductor.crear({
            Nombre: Nombre.trim(),
            Documento: Documento.trim(),
            Telefono: Telefono?.trim() || null
        });

        res.status(201).json({
            mensaje: 'Conductor registrado correctamente',
            datos: nuevoConductor
        });
    } catch (error) {
        console.error('Error al registrar conductor:', error);

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                mensaje: 'Ya existe un conductor con ese documento'
            });
        }

        res.status(500).json({
            mensaje: 'Error interno al registrar el conductor'
        });
    }
};

// PUT: actualizar los datos de un conductor
exports.actualizar = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { Nombre, Documento, Telefono } = req.body;

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                mensaje: 'El ID debe ser un entero positivo'
            });
        }

        if (
            typeof Nombre !== 'string' ||
            !Nombre.trim() ||
            typeof Documento !== 'string' ||
            !Documento.trim()
        ) {
            return res.status(400).json({
                mensaje: 'Nombre y Documento son obligatorios'
            });
        }

        if (Nombre.trim().length > 150 || Documento.trim().length > 20) {
            return res.status(400).json({
                mensaje: 'Nombre o Documento superan la longitud permitida'
            });
        }

        if (
            Telefono != null &&
            (typeof Telefono !== 'string' || Telefono.length > 20)
        ) {
            return res.status(400).json({
                mensaje: 'El teléfono debe ser texto de máximo 20 caracteres'
            });
        }

        const resultado = await Conductor.actualizar(id, {
            Nombre: Nombre.trim(),
            Documento: Documento.trim(),
            Telefono: Telefono?.trim() || null
        });

        if (resultado.affectedRows === 0) {
            const existente = await Conductor.obtenerPorId(id);

            if (!existente) {
                return res.status(404).json({
                    mensaje: 'Conductor no encontrado'
                });
            }
        }

        res.status(200).json({
            mensaje: 'Datos del conductor actualizados correctamente'
        });
    } catch (error) {
        console.error('Error al actualizar conductor:', error);

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                mensaje: 'El documento pertenece a otro conductor'
            });
        }

        res.status(500).json({
            mensaje: 'Error interno al actualizar el conductor'
        });
    }
};

// PATCH: cambiar el estado del conductor
exports.actualizarEstado = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { Estado } = req.body;

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                mensaje: 'El ID debe ser un entero positivo'
            });
        }

        if (!['Activo', 'Inactivo'].includes(Estado)) {
            return res.status(400).json({
                mensaje: 'El estado debe ser Activo o Inactivo'
            });
        }

        const existente = await Conductor.obtenerPorId(id);

        if (!existente) {
            return res.status(404).json({
                mensaje: 'Conductor no encontrado'
            });
        }

        await Conductor.actualizarEstado(id, Estado);

        res.status(200).json({
            mensaje: `Estado del conductor actualizado a ${Estado}`
        });
    } catch (error) {
        console.error('Error al actualizar estado:', error);
        res.status(500).json({
            mensaje: 'Error interno al actualizar el estado'
        });
    }
};
