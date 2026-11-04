const Tarifa = require('../models/Tarifa');

function esIdValido(valor) {
    return Number.isInteger(Number(valor)) && Number(valor) > 0;
}

function esValorValido(valor) {
    if (
        valor === undefined ||
        valor === null ||
        (typeof valor === 'string' && valor.trim() === '')
    ) {
        return false;
    }

    const numero = Number(valor);

    return Number.isFinite(numero) &&
        numero >= 0 &&
        numero <= 9999999999.99;
}

function esEstadoValido(estado) {
    return typeof estado === 'string' &&
        estado.trim() !== '' &&
        estado.trim().length <= 30;
}

// GET: Consultar todas las tarifas
exports.obtenerTodas = (req, res) => {
    Tarifa.obtenerTodas((error, resultados) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al consultar las tarifas.'
            });
        }

        res.json(resultados);
    });
};

// GET: Consultar una tarifa por ID
exports.obtenerPorId = (req, res) => {
    const { id } = req.params;

    if (!esIdValido(id)) {
        return res.status(400).json({
            mensaje: 'El ID de la tarifa debe ser un entero positivo.'
        });
    }

    Tarifa.obtenerPorId(id, (error, resultados) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al consultar la tarifa.'
            });
        }

        if (resultados.length === 0) {
            return res.status(404).json({
                mensaje: 'Tarifa no encontrada.'
            });
        }

        res.json(resultados[0]);
    });
};

// GET: Consultar tarifas de una ruta
exports.obtenerPorRuta = (req, res) => {
    const { idRuta } = req.params;

    if (!esIdValido(idRuta)) {
        return res.status(400).json({
            mensaje: 'El ID de la ruta debe ser un entero positivo.'
        });
    }

    Tarifa.obtenerPorRuta(idRuta, (error, resultados) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al consultar las tarifas de la ruta.'
            });
        }

        res.json(resultados);
    });
};

// POST: Registrar una tarifa
exports.crear = (req, res) => {
    const { IdRuta, Valor, Estado } = req.body;

    if (!esIdValido(IdRuta)) {
        return res.status(400).json({
            mensaje: 'IdRuta es obligatorio y debe ser un entero positivo.'
        });
    }

    if (!esValorValido(Valor)) {
        return res.status(400).json({
            mensaje: 'Valor es obligatorio y debe ser un número entre 0 y 9999999999.99.'
        });
    }

    if (Estado !== undefined && !esEstadoValido(Estado)) {
        return res.status(400).json({
            mensaje: 'Estado debe ser un texto de máximo 30 caracteres.'
        });
    }

    const datos = {
        IdRuta: Number(IdRuta),
        Valor: Number(Valor),
        Estado: Estado === undefined ? 'Activo' : Estado.trim()
    };

    Tarifa.crear(datos, (error, resultado) => {
        if (error) {
            if (error.code === 'ER_NO_REFERENCED_ROW_2') {
                return res.status(400).json({
                    mensaje: 'La ruta indicada no existe.'
                });
            }

            return res.status(500).json({
                mensaje: 'Error al registrar la tarifa.'
            });
        }

        res.status(201).json({
            mensaje: 'Tarifa registrada correctamente.',
            IdTarifa: resultado.insertId,
            ...datos
        });
    });
};

// PUT: Actualizar una tarifa
exports.actualizar = (req, res) => {
    const { id } = req.params;
    const { IdRuta, Valor, Estado } = req.body;

    if (!esIdValido(id)) {
        return res.status(400).json({
            mensaje: 'El ID de la tarifa debe ser un entero positivo.'
        });
    }

    if (!esIdValido(IdRuta)) {
        return res.status(400).json({
            mensaje: 'IdRuta es obligatorio y debe ser un entero positivo.'
        });
    }

    if (!esValorValido(Valor)) {
        return res.status(400).json({
            mensaje: 'Valor debe ser un número válido y no negativo.'
        });
    }

    if (!esEstadoValido(Estado)) {
        return res.status(400).json({
            mensaje: 'Estado es obligatorio y debe tener máximo 30 caracteres.'
        });
    }

    const datos = {
        IdRuta: Number(IdRuta),
        Valor: Number(Valor),
        Estado: Estado.trim()
    };

    Tarifa.actualizar(id, datos, (error, resultado) => {
        if (error) {
            if (error.code === 'ER_NO_REFERENCED_ROW_2') {
                return res.status(400).json({
                    mensaje: 'La ruta indicada no existe.'
                });
            }

            return res.status(500).json({
                mensaje: 'Error al actualizar la tarifa.'
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: 'Tarifa no encontrada o sin cambios.'
            });
        }

        res.json({
            mensaje: 'Tarifa actualizada correctamente.'
        });
    });
};

// PATCH: Cambiar el estado de una tarifa
exports.actualizarEstado = (req, res) => {
    const { id } = req.params;
    const { Estado } = req.body;

    if (!esIdValido(id)) {
        return res.status(400).json({
            mensaje: 'El ID de la tarifa debe ser un entero positivo.'
        });
    }

    if (!esEstadoValido(Estado)) {
        return res.status(400).json({
            mensaje: 'Estado es obligatorio y debe tener máximo 30 caracteres.'
        });
    }

    Tarifa.actualizarEstado(id, Estado.trim(), (error, resultado) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al actualizar el estado de la tarifa.'
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: 'Tarifa no encontrada o sin cambios.'
            });
        }

        res.json({
            mensaje: 'Estado de la tarifa actualizado correctamente.'
        });
    });
};
