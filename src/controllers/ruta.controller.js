
const Ruta = require('../models/Ruta');

// Validar el identificador recibido en la URL
function obtenerIdValido(valor) {
    const id = Number(valor);
    return Number.isInteger(id) && id > 0 ? id : null;
}

// Consultar todas las rutas
const listar = async (req, res) => {
    try {
        const rutas = await Ruta.obtenerTodas();
        return res.status(200).json(rutas);
    } catch (error) {
        console.error('Error al consultar rutas:', error.message);
        return res.status(500).json({
            mensaje: 'No se pudieron consultar las rutas'
        });
    }
};

// Consultar una ruta por ID
const buscarPorId = async (req, res) => {
    try {
        const id = obtenerIdValido(req.params.id);

        if (!id) {
            return res.status(400).json({
                mensaje: 'El ID de la ruta no es válido'
            });
        }

        const ruta = await Ruta.obtenerPorId(id);

        if (!ruta) {
            return res.status(404).json({
                mensaje: 'Ruta no encontrada'
            });
        }

        return res.status(200).json(ruta);
    } catch (error) {
        console.error('Error al buscar ruta:', error.message);
        return res.status(500).json({
            mensaje: 'No se pudo consultar la ruta'
        });
    }
};

// Registrar una ruta
const registrar = async (req, res) => {
    try {
        const {
            NumeroRuta,
            Origen,
            Destino,
            Estado,
            IdEmpresa
        } = req.body;

        if (
            !NumeroRuta?.trim() ||
            !Origen?.trim() ||
            !Destino?.trim() ||
            IdEmpresa === undefined ||
            IdEmpresa === null ||
            IdEmpresa === ''
        ) {
            return res.status(400).json({
                mensaje: 'NumeroRuta, Origen, Destino e IdEmpresa son obligatorios'
            });
        }

        const empresaId = Number(IdEmpresa);

        if (!Number.isInteger(empresaId) || empresaId < 1) {
            return res.status(400).json({
                mensaje: 'IdEmpresa debe ser un entero positivo'
            });
        }

        const estadoFinal = Estado ?? 'Activa';

        if (!['Activa', 'Inactiva'].includes(estadoFinal)) {
            return res.status(400).json({
                mensaje: 'El estado debe ser Activa o Inactiva'
            });
        }

        const ruta = await Ruta.crear({
            NumeroRuta: NumeroRuta.trim(),
            Origen: Origen.trim(),
            Destino: Destino.trim(),
            Estado: estadoFinal,
            IdEmpresa: empresaId
        });

        return res.status(201).json({
            mensaje: 'Ruta registrada correctamente',
            datos: ruta
        });
    } catch (error) {
        console.error('Error al registrar ruta:', error.message);

        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(400).json({
                mensaje: 'La empresa indicada no existe'
            });
        }

        return res.status(500).json({
            mensaje: 'No se pudo registrar la ruta'
        });
    }
};

// Actualizar una ruta existente
const actualizar = async (req, res) => {
    try {
        const id = obtenerIdValido(req.params.id);

        if (!id) {
            return res.status(400).json({
                mensaje: 'El ID de la ruta no es válido'
            });
        }

        const {
            NumeroRuta,
            Origen,
            Destino,
            Estado,
            IdEmpresa
        } = req.body;

        if (
            !NumeroRuta?.trim() ||
            !Origen?.trim() ||
            !Destino?.trim() ||
            IdEmpresa === undefined ||
            IdEmpresa === null ||
            IdEmpresa === ''
        ) {
            return res.status(400).json({
                mensaje: 'NumeroRuta, Origen, Destino e IdEmpresa son obligatorios'
            });
        }

        const empresaId = Number(IdEmpresa);

        if (!Number.isInteger(empresaId) || empresaId < 1) {
            return res.status(400).json({
                mensaje: 'IdEmpresa debe ser un entero positivo'
            });
        }

        if (!['Activa', 'Inactiva'].includes(Estado)) {
            return res.status(400).json({
                mensaje: 'El estado debe ser Activa o Inactiva'
            });
        }

        const ruta = await Ruta.actualizar(id, {
            NumeroRuta: NumeroRuta.trim(),
            Origen: Origen.trim(),
            Destino: Destino.trim(),
            Estado,
            IdEmpresa: empresaId
        });

        if (!ruta) {
            return res.status(404).json({
                mensaje: 'Ruta no encontrada'
            });
        }

        return res.status(200).json({
            mensaje: 'Ruta actualizada correctamente',
            datos: ruta
        });
    } catch (error) {
        console.error('Error al actualizar ruta:', error.message);
        return res.status(500).json({
            mensaje: 'No se pudo actualizar la ruta'
        });
    }
};

// Cambiar el estado sin eliminar el registro
const cambiarEstado = async (req, res) => {
    try {
        const id = obtenerIdValido(req.params.id);
        const { Estado } = req.body;

        if (!id) {
            return res.status(400).json({
                mensaje: 'El ID de la ruta no es válido'
            });
        }

        if (!['Activa', 'Inactiva'].includes(Estado)) {
            return res.status(400).json({
                mensaje: 'El estado debe ser Activa o Inactiva'
            });
        }

        const ruta = await Ruta.cambiarEstado(id, Estado);

        if (!ruta) {
            return res.status(404).json({
                mensaje: 'Ruta no encontrada'
            });
        }

        return res.status(200).json({
            mensaje: `Estado de la ruta actualizado a ${Estado}`,
            datos: ruta
        });
    } catch (error) {
        console.error('Error al cambiar estado:', error.message);
        return res.status(500).json({
            mensaje: 'No se pudo cambiar el estado de la ruta'
        });
    }
};

module.exports = {
    listar,
    buscarPorId,
    registrar,
    actualizar,
    cambiarEstado
};
