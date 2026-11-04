const db = require('../config/db');

const Notificacion = {
    // Consultar todas las notificaciones
    obtenerTodas: (callback) => {
        const sql = `
            SELECT IdNotificacion, IdUsuario, Titulo, Mensaje, Fecha, Leida
            FROM notificacion
            ORDER BY Fecha DESC
        `;

        db.query(sql, callback);
    },

    // Consultar una notificación por su ID
    obtenerPorId: (id, callback) => {
        const sql = `
            SELECT IdNotificacion, IdUsuario, Titulo, Mensaje, Fecha, Leida
            FROM notificacion
            WHERE IdNotificacion = ?
        `;

        db.query(sql, [id], callback);
    },

    // Consultar notificaciones de un usuario
    obtenerPorUsuario: (idUsuario, callback) => {
        const sql = `
            SELECT IdNotificacion, IdUsuario, Titulo, Mensaje, Fecha, Leida
            FROM notificacion
            WHERE IdUsuario = ?
            ORDER BY Fecha DESC
        `;

        db.query(sql, [idUsuario], callback);
    },

    // Crear una notificación
    crear: (notificacion, callback) => {
        const sql = `
            INSERT INTO notificacion (IdUsuario, Titulo, Mensaje)
            VALUES (?, ?, ?)
        `;

        const valores = [
            notificacion.IdUsuario,
            notificacion.Titulo,
            notificacion.Mensaje
        ];

        db.query(sql, valores, callback);
    },

    // Marcar una notificación como leída o no leída
    actualizarLeida: (id, leida, callback) => {
        const sql = `
            UPDATE notificacion
            SET Leida = ?
            WHERE IdNotificacion = ?
        `;

        db.query(sql, [leida, id], callback);
    }
};

module.exports = Notificacion;