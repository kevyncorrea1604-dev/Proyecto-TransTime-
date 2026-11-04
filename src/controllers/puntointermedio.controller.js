
const PuntoIntermedio = require('../models/PuntoIntermedio');

// GET: consultar todos los puntos
exports.obtenerTodos = async (req, res) => {
    try {
        const puntos = await PuntoIntermedio.obtenerTodos();

        res.status(200).json({ datos: puntos });
    } catch (error) {
        console.error('Error al consultar puntos:', error);
        res.status(500).json({
            mensaje: 'Error al consultar los puntos intermedios'
        });
    }
};

// GET: consultar un punto por ID
exports.obtenerPorId = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                mensaje: 'El ID debe ser un entero positivo'
            });
        }

        const punto = await PuntoIntermedio.obtenerPorId(id);

        if (!punto) {
            return res.status(404).json({
                mensaje: 'Punto intermedio no encontrado'
            });
        }

        res.status(200).json({ datos: punto });
    } catch (error) {
        console.error('Error al consultar punto:', error);
        res.status(500).json({
            mensaje: 'Error al consultar el punto intermedio'
        });
    }
};

// GET: consultar puntos de una ruta
exports.obtenerPorRuta = async (req, res) => {
    try {
        const idRuta = Number(req.params.idRuta);

        if (!Number.isInteger(idRuta) || idRuta <= 0) {
            return res.status(400).json({
                mensaje: 'El ID de la ruta debe ser un entero positivo'
            });
        }

        const puntos = await PuntoIntermedio.obtenerPorRuta(idRuta);

        res.status(200).json({ datos: puntos });
    } catch (error) {
        console.error('Error al consultar puntos de ruta:', error);
        res.status(500).json({
            mensaje: 'Error al consultar los puntos de la ruta'
        });
    }
};

// POST: registrar un punto intermedio
exports.crear = async (req, res) => {
    try {
        const {
            IdRuta,
            Nombre,
            Direccion,
            Latitud,
            Longitud,
            Estado
        } = req.body;

        if (
            !Number.isInteger(IdRuta) ||
            IdRuta <= 0 ||
            typeof Nombre !== 'string' ||
            !Nombre.trim()
        ) {
            return res.status(400).json({
                mensaje: 'IdRuta debe ser un entero positivo y Nombre es obligatorio'
            });
        }

        if (
            Latitud != null &&
            (!Number.isFinite(Number(Latitud)) ||
             Number(Latitud) < -90 || Number(Latitud) > 90)
        ) {
            return res.status(400).json({
                mensaje: 'La latitud debe estar entre -90 y 90'
            });
        }

        if (
            Longitud != null &&
            (!Number.isFinite(Number(Longitud)) ||
             Number(Longitud) < -180 || Number(Longitud) > 180)
        ) {
            return res.status(400).json({
                mensaje: 'La longitud debe estar entre -180 y 180'
            });
        }

        if (
            Estado !== undefined &&
            !['Activo', 'Inactivo'].includes(Estado)
        ) {
            return res.status(400).json({
                mensaje: 'Estado debe ser Activo o Inactivo'
            });
        }

        const nuevoPunto = await PuntoIntermedio.crear({
            IdRuta,
            Nombre: Nombre.trim(),
            Direccion,
            Latitud: Latitud == null ? null : Number(Latitud),
            Longitud: Longitud == null ? null : Number(Longitud),
            Estado
        });

        res.status(201).json({
            mensaje: 'Punto intermedio registrado correctamente',
            datos: nuevoPunto
        });
    } catch (error) {
        console.error('Error al crear punto intermedio:', error);
        res.status(500).json({
            mensaje: 'No fue posible registrar el punto intermedio'
        });
    }
};

// PUT: actualizar los datos de un punto intermedio
exports.actualizar = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const {
            IdRuta,
            Nombre,
            Direccion,
            Latitud,
            Longitud,
            Estado
        } = req.body;

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                mensaje: 'El ID debe ser un entero positivo'
            });
        }

        if (
            !Number.isInteger(IdRuta) ||
            IdRuta <= 0 ||
            typeof Nombre !== 'string' ||
            !Nombre.trim() ||
            !['Activo', 'Inactivo'].includes(Estado)
        ) {
            return res.status(400).json({
                mensaje: 'Verifica IdRuta, Nombre y Estado'
            });
        }

        if (
            Latitud != null &&
            (!Number.isFinite(Number(Latitud)) ||
             Number(Latitud) < -90 || Number(Latitud) > 90)
        ) {
            return res.status(400).json({
                mensaje: 'Latitud inválida'
            });
        }

        if (
            Longitud != null &&
            (!Number.isFinite(Number(Longitud)) ||
             Number(Longitud) < -180 || Number(Longitud) > 180)
        ) {
            return res.status(400).json({
                mensaje: 'Longitud inválida'
            });
        }

        const actualizado = await PuntoIntermedio.actualizar(id, {
            IdRuta,
            Nombre: Nombre.trim(),
            Direccion,
            Latitud: Latitud == null ? null : Number(Latitud),
            Longitud: Longitud == null ? null : Number(Longitud),
            Estado
        });

        if (!actualizado) {
            return res.status(404).json({
                mensaje: 'Punto intermedio no encontrado'
            });
        }

        res.status(200).json({
            mensaje: 'Punto intermedio actualizado correctamente'
        });
    } catch (error) {
        console.error('Error al actualizar punto:', error);
        res.status(500).json({
            mensaje: 'Error al actualizar el punto intermedio'
        });
    }
};

// PATCH: cambiar estado
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
                mensaje: 'Estado debe ser Activo o Inactivo'
            });
        }

        const actualizado =
            await PuntoIntermedio.actualizarEstado(id, Estado);

        if (!actualizado) {
            return res.status(404).json({
                mensaje: 'Punto intermedio no encontrado'
            });
        }

        res.status(200).json({
            mensaje: 'Estado actualizado correctamente'
        });
    } catch (error) {
        console.error('Error al cambiar estado:', error);
        res.status(500).json({
            mensaje: 'Error al cambiar el estado del punto intermedio'
        });
    }
};
