
const db = require('../config/db');

const Ubicacion = {
    // Consultar todas las ubicaciones
    obtenerTodas(callback) {
        const sql = `
            SELECT IdUbicacion, IdBuseta, Latitud, Longitud, FechaHora
            FROM ubicacion
            ORDER BY FechaHora DESC
        `;

        db.query(sql, callback);
    },

    // Consultar una ubicación por su ID
    obtenerPorId(id, callback) {
        const sql = `
            SELECT IdUbicacion, IdBuseta, Latitud, Longitud, FechaHora
            FROM ubicacion
            WHERE IdUbicacion = ?
        `;

        db.query(sql, [id], callback);
    },

    // Consultar el historial de ubicaciones de una buseta
    obtenerPorBuseta(idBuseta, callback) {
        const sql = `
            SELECT IdUbicacion, IdBuseta, Latitud, Longitud, FechaHora
            FROM ubicacion
            WHERE IdBuseta = ?
            ORDER BY FechaHora DESC
        `;

        db.query(sql, [idBuseta], callback);
    },

    // Registrar una ubicación
    crear(datos, callback) {
        const sql = `
            INSERT INTO ubicacion (IdBuseta, Latitud, Longitud)
            VALUES (?, ?, ?)
        `;

        db.query(
            sql,
            [datos.IdBuseta, datos.Latitud, datos.Longitud],
            callback
        );
    },

    // Actualizar las coordenadas de una ubicación
    actualizar(id, datos, callback) {
        const sql = `
            UPDATE ubicacion
            SET IdBuseta = ?, Latitud = ?, Longitud = ?
            WHERE IdUbicacion = ?
        `;

        db.query(
            sql,
            [datos.IdBuseta, datos.Latitud, datos.Longitud, id],
            callback
        );
    }
};

module.exports = Ubicacion;