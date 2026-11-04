
const db = require('../config/db');

const HistorialRuta = {
    // Consultar todo el historial de rutas
    obtenerTodos(callback) {
        const sql = `
            SELECT IdHistorialRuta, IdUsuario, IdRuta, Estado, Fecha
            FROM historialruta
            ORDER BY Fecha DESC
        `;

        db.query(sql, callback);
    },

    // Buscar un registro del historial por su ID
    obtenerPorId(id, callback) {
        const sql = `
            SELECT IdHistorialRuta, IdUsuario, IdRuta, Estado, Fecha
            FROM historialruta
            WHERE IdHistorialRuta = ?
        `;

        db.query(sql, [id], callback);
    },

    // Consultar el historial de un usuario
    obtenerPorUsuario(idUsuario, callback) {
        const sql = `
            SELECT IdHistorialRuta, IdUsuario, IdRuta, Estado, Fecha
            FROM historialruta
            WHERE IdUsuario = ?
            ORDER BY Fecha DESC
        `;

        db.query(sql, [idUsuario], callback);
    },

    // Registrar una ruta en el historial
    crear(datos, callback) {
        const sql = `
            INSERT INTO historialruta (IdUsuario, IdRuta, Estado)
            VALUES (?, ?, ?)
        `;

        db.query(
            sql,
            [datos.IdUsuario, datos.IdRuta, datos.Estado || 'Consultada'],
            callback
        );
    },

    // Actualizar el estado de un registro
    actualizarEstado(id, estado, callback) {
        const sql = `
            UPDATE historialruta
            SET Estado = ?
            WHERE IdHistorialRuta = ?
        `;

        db.query(sql, [estado, id], callback);
    }
};

module.exports = HistorialRuta;
