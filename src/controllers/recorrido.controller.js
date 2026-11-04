
const Recorrido = require('../models/Recorrido');

// GET: consultar todos los recorridos
exports.obtenerTodos = async (req, res) => {
    try {
        const recorridos = await Recorrido.obtenerTodos();

        res.status(200).json({
            mensaje: 'Recorridos consultados correctamente',
            datos: recorridos
        });
    } catch (error) {
        console.error('Error al consultar recorridos:', error);
        res.status(500).json({
            mensaje: 'Error interno al consultar los recorridos'
        });
    }
};

// GET: consultar un recorrido por ID
exports.obtenerPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({
                mensaje: 'El ID del recorrido debe ser un entero positivo'
            });
        }

        const recorrido = await Recorrido.obtenerPorId(Number(id));

        if (!recorrido) {
            return res.status(404).json({
                mensaje: 'Recorrido no encontrado'
            });
        }

        res.status(200).json({ datos: recorrido });
    } catch (error) {
        console.error('Error al consultar recorrido:', error);
        res.status(500).json({
            mensaje: 'Error interno al consultar el recorrido'
        });
    }
};

// GET: consultar recorridos de una ruta, en orden
exports.obtenerPorRuta = async (req, res) => {
    try {
        const { idRuta } = req.params;

        if (!Number.isInteger(Number(idRuta)) || Number(idRuta) <= 0) {
            return res.status(400).json({
                mensaje: 'El ID de la ruta debe ser un entero positivo'
            });
        }

        const recorridos = await Recorrido.obtenerPorRuta(Number(idRuta));

        res.status(200).json({
            mensaje: 'Recorrido de la ruta consultado correctamente',
            datos: recorridos
        });
    } catch (error) {
        console.error('Error al consultar recorrido de ruta:', error);
        res.status(500).json({
            mensaje: 'Error interno al consultar el recorrido de la ruta'
        });
    }
};

// POST: registrar un punto en un recorrido
exports.crear = async (req, res) => {
    try {
        const { IdPuntoIntermedio, IdRuta, Orden } = req.body;

        if (
            !Number.isInteger(IdPuntoIntermedio) ||
            IdPuntoIntermedio <= 0 ||
            !Number.isInteger(IdRuta) ||
            IdRuta <= 0 ||
            !Number.isInteger(Orden) ||
            Orden <= 0
        ) {
            return res.status(400).json({
                mensaje: 'IdPuntoIntermedio, IdRuta y Orden deben ser enteros positivos'
            });
        }

        const nuevoRecorrido = await Recorrido.crear({
            IdPuntoIntermedio,
            IdRuta,
            Orden
        });

        res.status(201).json({
            mensaje: 'Punto agregado al recorrido correctamente',
            datos: nuevoRecorrido
        });
    } catch (error) {
        console.error('Error al crear recorrido:', error);
        res.status(500).json({
            mensaje: 'No fue posible registrar el recorrido. Verifica las claves foráneas y la base de datos.'
        });
    }
};

// PATCH: actualizar el orden de un punto
exports.actualizarOrden = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { Orden } = req.body;

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                mensaje: 'El ID del recorrido debe ser un entero positivo'
            });
        }

        if (!Number.isInteger(Orden) || Orden <= 0) {
            return res.status(400).json({
                mensaje: 'Orden debe ser un entero positivo'
            });
        }

        const actualizado = await Recorrido.actualizarOrden(id, Orden);

        if (!actualizado) {
            return res.status(404).json({
                mensaje: 'Recorrido no encontrado'
            });
        }

        res.status(200).json({
            mensaje: 'Orden actualizado correctamente'
        });
    } catch (error) {
        console.error('Error al actualizar orden:', error);
        res.status(500).json({
            mensaje: 'Error interno al actualizar el orden'
        });
    }
};

exports.actualizarEstado = async (req, res) => {
    try {
        const { id } = req.params;
        const { Estado } = req.body;

        if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({
                mensaje: 'El ID del recorrido no es válido.'
            });
        }

        if (!['Activo', 'Inactivo'].includes(Estado)) {
            return res.status(400).json({
                mensaje: 'El estado debe ser Activo o Inactivo.'
            });
        }

        const resultado = await Recorrido.actualizarEstado(Number(id), Estado);;

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: 'No se encontró el recorrido.'
            });
        }

        res.json({
            mensaje: `Estado del recorrido actualizado a ${Estado}.`
        });
    } catch (error) {
        console.error('Error al actualizar estado:', error);

        res.status(500).json({
            mensaje: 'Error al actualizar el estado del recorrido.'
        });
    }
};