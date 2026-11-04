
const db = require('../config/db');

const RutaPuntoReferencia = {
    // Consultar todas las relaciones entre rutas y puntos
    obtenerTodos(callback) {
        const sql = `
            SELECT
                rpr.IdRutaPuntoReferencia,
                rpr.IdRuta,
                rpr.IdPuntoReferencia,
                pr.Nombre AS NombrePuntoReferencia,
                rpr.OrdenPuntoReferencia,
                rpr.TiempoEstimado
            FROM rutapuntoreferencia rpr
            INNER JOIN puntoreferencia pr
                ON rpr.IdPuntoReferencia = pr.IdPuntoReferencia
            ORDER BY rpr.IdRuta, rpr.OrdenPuntoReferencia
        `;

        db.query(sql, callback);
    },

    // Consultar una relación por su identificador
    obtenerPorId(id, callback) {
        const sql = `
            SELECT *
            FROM rutapuntoreferencia
            WHERE IdRutaPuntoReferencia = ?
        `;

        db.query(sql, [id], callback);
    },

    // Consultar todos los puntos asociados a una ruta
    obtenerPorRuta(idRuta, callback) {
        const sql = `
            SELECT
                rpr.IdRutaPuntoReferencia,
                rpr.IdRuta,
                rpr.IdPuntoReferencia,
                pr.Nombre AS NombrePuntoReferencia,
                pr.Direccion,
                pr.Latitud,
                pr.Longitud,
                rpr.OrdenPuntoReferencia,
                rpr.TiempoEstimado
            FROM rutapuntoreferencia rpr
            INNER JOIN puntoreferencia pr
                ON rpr.IdPuntoReferencia = pr.IdPuntoReferencia
            WHERE rpr.IdRuta = ?
            ORDER BY rpr.OrdenPuntoReferencia
        `;

        db.query(sql, [idRuta], callback);
    },

    // Asociar un punto de referencia con una ruta
    crear(datos, callback) {
        const sql = `
            INSERT INTO rutapuntoreferencia
            (
                IdRuta,
                IdPuntoReferencia,
                OrdenPuntoReferencia,
                TiempoEstimado
            )
            VALUES (?, ?, ?, ?)
        `;

        const valores = [
            datos.IdRuta,
            datos.IdPuntoReferencia,
            datos.OrdenPuntoReferencia,
            datos.TiempoEstimado
        ];

        db.query(sql, valores, callback);
    },

    // Actualizar el orden y el tiempo estimado de una relación
    actualizar(id, datos, callback) {
        const sql = `
            UPDATE rutapuntoreferencia
            SET IdRuta = ?,
                IdPuntoReferencia = ?,
                OrdenPuntoReferencia = ?,
                TiempoEstimado = ?
            WHERE IdRutaPuntoReferencia = ?
        `;

        const valores = [
            datos.IdRuta,
            datos.IdPuntoReferencia,
            datos.OrdenPuntoReferencia,
            datos.TiempoEstimado,
            id
        ];

        db.query(sql, valores, callback);
    },

    // Eliminar una relación específica entre ruta y punto
    eliminar(id, callback) {
        const sql = `
            DELETE FROM rutapuntoreferencia
            WHERE IdRutaPuntoReferencia = ?
        `;

        db.query(sql, [id], callback);
    }
};

module.exports = RutaPuntoReferencia;
