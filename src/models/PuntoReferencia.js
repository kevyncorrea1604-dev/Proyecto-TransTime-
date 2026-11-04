const db = require('../config/db');

const PuntoReferencia = {
    // Consultar todos los puntos de referencia
    obtenerTodos(callback) {
        const sql = 'SELECT * FROM puntoreferencia ORDER BY IdPuntoReferencia DESC';
        db.query(sql, callback);
    },

    // Consultar un punto de referencia por su ID
    obtenerPorId(id, callback) {
        const sql = `
            SELECT * FROM puntoreferencia
            WHERE IdPuntoReferencia = ?
        `;
        db.query(sql, [id], callback);
    },

    // Crear un nuevo punto de referencia
    crear(datos, callback) {
        const sql = `
            INSERT INTO puntoreferencia
            (Nombre, Direccion, Latitud, Longitud)
            VALUES (?, ?, ?, ?)
        `;

        const valores = [
            datos.Nombre,
            datos.Direccion ?? null,
            datos.Latitud ?? null,
            datos.Longitud ?? null
        ];

        db.query(sql, valores, callback);
    },

    // Actualizar los datos de un punto de referencia
    actualizar(id, datos, callback) {
        const sql = `
            UPDATE puntoreferencia
            SET Nombre = ?,
                Direccion = ?,
                Latitud = ?,
                Longitud = ?
            WHERE IdPuntoReferencia = ?
        `;

        const valores = [
            datos.Nombre,
            datos.Direccion ?? null,
            datos.Latitud ?? null,
            datos.Longitud ?? null,
            id
        ];

        db.query(sql, valores, callback);
    },

    // Cambiar el estado para activar o desactivar el punto
    actualizarEstado(id, estado, callback) {
        const sql = `
            UPDATE puntoreferencia
            SET Estado = ?
            WHERE IdPuntoReferencia = ?
        `;
        db.query(sql, [estado, id], callback);
    }
};

module.exports = PuntoReferencia;