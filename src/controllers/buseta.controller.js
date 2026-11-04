
const Buseta = require('../models/Buseta');

const listar = async (req, res) => {
    try {
        const busetas = await Buseta.obtenerTodas();
        res.status(200).json(busetas);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al consultar las busetas'
        });
    }
};

const buscarPorId = async (req, res) => {
    try {
        const buseta = await Buseta.obtenerPorId(req.params.id);

        if (!buseta) {
            return res.status(404).json({
                mensaje: 'Buseta no encontrada'
            });
        }

        res.status(200).json(buseta);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al consultar la buseta'
        });
    }
};

const registrar = async (req, res) => {
    try {
        const {
            IdRuta,
            IdEmpresa,
            IdConductor,
            Placa,
            NumeroInterno,
            Estado
        } = req.body;

        if (
            !Placa?.trim() ||
            NumeroInterno == null ||
            !String(NumeroInterno).trim() ||
            !Number.isInteger(Number(IdRuta)) || Number(IdRuta) < 1 ||
            !Number.isInteger(Number(IdEmpresa)) || Number(IdEmpresa) < 1 ||
            !Number.isInteger(Number(IdConductor)) || Number(IdConductor) < 1
        ) {
            return res.status(400).json({
                mensaje: 'Verifica la placa, el número interno y los IDs'
            });
        }

        const nuevaBuseta = await Buseta.crear({
            IdRuta: Number(IdRuta),
            IdEmpresa: Number(IdEmpresa),
            IdConductor: Number(IdConductor),
            Placa: Placa.trim(),
            NumeroInterno: String(NumeroInterno).trim(),
            Estado: Estado ?? 'Activo'
        });

        res.status(201).json({
            mensaje: 'Buseta registrada correctamente',
            datos: nuevaBuseta
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'No se pudo registrar la buseta'
        });
    }
};

const actualizar = async (req, res) => {
    try {
        const {
            IdRuta,
            IdEmpresa,
            IdConductor,
            Placa,
            NumeroInterno,
            Estado
        } = req.body;

        if (
            !Placa?.trim() ||
            NumeroInterno == null ||
            !String(NumeroInterno).trim() ||
            !Number.isInteger(Number(IdRuta)) || Number(IdRuta) < 1 ||
            !Number.isInteger(Number(IdEmpresa)) || Number(IdEmpresa) < 1 ||
            !Number.isInteger(Number(IdConductor)) || Number(IdConductor) < 1 ||
            !['Activo', 'Inactivo'].includes(Estado)
        ) {
            return res.status(400).json({
                mensaje: 'Datos inválidos. Verifica los campos y el estado'
            });
        }

        const buseta = await Buseta.actualizar(req.params.id, {
            IdRuta: Number(IdRuta),
            IdEmpresa: Number(IdEmpresa),
            IdConductor: Number(IdConductor),
            Placa: Placa.trim(),
            NumeroInterno: String(NumeroInterno).trim(),
            Estado
        });

        if (!buseta) {
            return res.status(404).json({
                mensaje: 'Buseta no encontrada'
            });
        }

        res.status(200).json({
            mensaje: 'Buseta actualizada correctamente',
            datos: buseta
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'No se pudo actualizar la buseta'
        });
    }
};

const cambiarEstado = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { Estado } = req.body;

        if (!Number.isInteger(id) || id < 1) {
            return res.status(400).json({
                mensaje: 'El ID de la buseta no es válido'
            });
        }

        if (!['Activo', 'Inactivo'].includes(Estado)) {
            return res.status(400).json({
                mensaje: 'El estado debe ser Activo o Inactivo'
            });
        }

        const buseta = await Buseta.cambiarEstado(id, Estado);

        if (!buseta) {
            return res.status(404).json({
                mensaje: 'Buseta no encontrada'
            });
        }

        res.status(200).json({
            mensaje: `Estado de la buseta actualizado a ${Estado}`,
            datos: buseta
        });
    } catch (error) {
        console.error('Error al cambiar el estado:', error.message);

        res.status(500).json({
            mensaje: 'No se pudo cambiar el estado de la buseta'
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