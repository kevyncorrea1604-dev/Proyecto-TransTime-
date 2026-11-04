
const Favorito = require('../models/Favorito');

// Validar que un identificador sea un entero positivo
function esIdValido(valor) {
    return Number.isInteger(Number(valor)) && Number(valor) > 0;
}

// GET: Obtener todos los favoritos
exports.obtenerTodos = (req, res) => {
    Favorito.obtenerTodos((error, resultados) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al consultar los favoritos.'
            });
        }

        res.json(resultados);
    });
};

// GET: Obtener un favorito por ID
exports.obtenerPorId = (req, res) => {
    const { id } = req.params;

    if (!esIdValido(id)) {
        return res.status(400).json({
            mensaje: 'El ID del favorito debe ser un entero positivo.'
        });
    }

    Favorito.obtenerPorId(id, (error, resultados) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al consultar el favorito.'
            });
        }

        if (resultados.length === 0) {
            return res.status(404).json({
                mensaje: 'Favorito no encontrado.'
            });
        }

        res.json(resultados[0]);
    });
};

// GET: Obtener los favoritos de un usuario
exports.obtenerPorUsuario = (req, res) => {
    const { idUsuario } = req.params;

    if (!esIdValido(idUsuario)) {
        return res.status(400).json({
            mensaje: 'El ID del usuario debe ser un entero positivo.'
        });
    }

    Favorito.obtenerPorUsuario(idUsuario, (error, resultados) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al consultar los favoritos del usuario.'
            });
        }

        res.json(resultados);
    });
};

// POST: Registrar un favorito
exports.crear = (req, res) => {
    const { IdUsuario, IdRuta } = req.body;

    if (!esIdValido(IdUsuario) || !esIdValido(IdRuta)) {
        return res.status(400).json({
            mensaje: 'IdUsuario e IdRuta son obligatorios y deben ser enteros positivos.'
        });
    }

    Favorito.crear(
        {
            IdUsuario: Number(IdUsuario),
            IdRuta: Number(IdRuta)
        },
        (error, resultado) => {
            if (error) {
                if (error.code === 'ER_NO_REFERENCED_ROW_2') {
                    return res.status(400).json({
                        mensaje: 'El usuario o la ruta indicada no existe.'
                    });
                }

                return res.status(500).json({
                    mensaje: 'Error al registrar el favorito.'
                });
            }

            res.status(201).json({
                mensaje: 'Favorito registrado correctamente.',
                IdFavorito: resultado.insertId,
                IdUsuario: Number(IdUsuario),
                IdRuta: Number(IdRuta)
            });
        }
    );
};

// PUT: Actualizar un favorito existente
exports.actualizar = (req, res) => {
    const { id } = req.params;
    const { IdUsuario, IdRuta } = req.body;

    if (!esIdValido(id)) {
        return res.status(400).json({
            mensaje: 'El ID del favorito debe ser un entero positivo.'
        });
    }

    if (!esIdValido(IdUsuario) || !esIdValido(IdRuta)) {
        return res.status(400).json({
            mensaje: 'IdUsuario e IdRuta son obligatorios y deben ser enteros positivos.'
        });
    }

    Favorito.actualizar(
        id,
        {
            IdUsuario: Number(IdUsuario),
            IdRuta: Number(IdRuta)
        },
        (error, resultado) => {
            if (error) {
                if (error.code === 'ER_NO_REFERENCED_ROW_2') {
                    return res.status(400).json({
                        mensaje: 'El usuario o la ruta indicada no existe.'
                    });
                }

                return res.status(500).json({
                    mensaje: 'Error al actualizar el favorito.'
                });
            }

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    mensaje: 'Favorito no encontrado o sin cambios.'
                });
            }

            res.json({
                mensaje: 'Favorito actualizado correctamente.'
            });
        }
    );
};