
const Empresa = require('../models/Empresa');

// GET: consultar todas las empresas
exports.obtenerTodas = async (req, res) => {
    try {
        const empresas = await Empresa.obtenerTodas();

        res.status(200).json({
            mensaje: 'Empresas consultadas correctamente',
            datos: empresas
        });
    } catch (error) {
        console.error('Error al consultar empresas:', error);
        res.status(500).json({
            mensaje: 'Error interno al consultar las empresas'
        });
    }
};

// GET: consultar una empresa por ID
exports.obtenerPorId = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                mensaje: 'El ID debe ser un entero positivo'
            });
        }

        const empresa = await Empresa.obtenerPorId(id);

        if (!empresa) {
            return res.status(404).json({
                mensaje: 'Empresa no encontrada'
            });
        }

        res.status(200).json({ datos: empresa });
    } catch (error) {
        console.error('Error al consultar empresa:', error);
        res.status(500).json({
            mensaje: 'Error interno al consultar la empresa'
        });
    }
};

// POST: registrar una empresa
exports.crear = async (req, res) => {
    try {
        const { Nombre, Telefono, Direccion } = req.body;

        if (typeof Nombre !== 'string' || !Nombre.trim()) {
            return res.status(400).json({
                mensaje: 'El nombre de la empresa es obligatorio'
            });
        }

        if (Nombre.trim().length > 150) {
            return res.status(400).json({
                mensaje: 'El nombre no puede superar los 150 caracteres'
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

        if (
            Direccion != null &&
            (typeof Direccion !== 'string' || Direccion.length > 200)
        ) {
            return res.status(400).json({
                mensaje: 'La dirección debe ser texto de máximo 200 caracteres'
            });
        }

        const nuevaEmpresa = await Empresa.crear({
            Nombre: Nombre.trim(),
            Telefono: Telefono?.trim() || null,
            Direccion: Direccion?.trim() || null
        });

        res.status(201).json({
            mensaje: 'Empresa registrada correctamente',
            datos: nuevaEmpresa
        });
    } catch (error) {
        console.error('Error al registrar empresa:', error);
        res.status(500).json({
            mensaje: 'Error interno al registrar la empresa'
        });
    }
};

// PUT: actualizar los datos de una empresa
exports.actualizar = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { Nombre, Telefono, Direccion } = req.body;

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                mensaje: 'El ID debe ser un entero positivo'
            });
        }

        if (typeof Nombre !== 'string' || !Nombre.trim()) {
            return res.status(400).json({
                mensaje: 'El nombre de la empresa es obligatorio'
            });
        }

        if (Nombre.trim().length > 150) {
            return res.status(400).json({
                mensaje: 'El nombre no puede superar los 150 caracteres'
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

        if (
            Direccion != null &&
            (typeof Direccion !== 'string' || Direccion.length > 200)
        ) {
            return res.status(400).json({
                mensaje: 'La dirección debe ser texto de máximo 200 caracteres'
            });
        }

        const existente = await Empresa.obtenerPorId(id);

        if (!existente) {
            return res.status(404).json({
                mensaje: 'Empresa no encontrada'
            });
        }

        await Empresa.actualizar(id, {
            Nombre: Nombre.trim(),
            Telefono: Telefono?.trim() || null,
            Direccion: Direccion?.trim() || null
        });

        res.status(200).json({
            mensaje: 'Empresa actualizada correctamente'
        });
    } catch (error) {
        console.error('Error al actualizar empresa:', error);
        res.status(500).json({
            mensaje: 'Error interno al actualizar la empresa'
        });
    }
};

// PATCH: cambiar el estado de una empresa
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

        const existente = await Empresa.obtenerPorId(id);

        if (!existente) {
            return res.status(404).json({
                mensaje: 'Empresa no encontrada'
            });
        }

        await Empresa.actualizarEstado(id, Estado);

        res.status(200).json({
            mensaje: `Estado de la empresa actualizado a ${Estado}`
        });
    } catch (error) {
        console.error('Error al actualizar estado de empresa:', error);
        res.status(500).json({
            mensaje: 'Error interno al actualizar el estado'
        });
    }
};
