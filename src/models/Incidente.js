
const db = require('../config/db');

const Incidente = {
    // Consultar todos los incidentes
    obtenerTodos(callback) {
        const sql = `
            SELECT *
            FROM incidente
            ORDER BY FechaInicio DESC
        `;

        db.query(sql, callback);
    },

    // Consultar un incidente por su identificador
    obtenerPorId(id, callback) {
        const sql = `
            SELECT *
            FROM incidente
            WHERE IdIncidente = ?
        `;

        db.query(sql, [id], callback);
    },

    // Consultar incidentes asociados a una ruta
    obtenerPorRuta(idRuta, callback) {
        const sql = `
            SELECT *
            FROM incidente
            WHERE IdRuta = ?
            ORDER BY FechaInicio DESC
        `;

        db.query(sql, [idRuta], callback);
    },

    // Registrar un nuevo incidente
    crear(datos, callback) {
        const sql = `
            INSERT INTO incidente
                (IdRuta, FechaInicio, FechaFin, Descripcion)
            VALUES (?, COALESCE(?, CURRENT_TIMESTAMP), ?, ?)
        `;

        const valores = [
            datos.IdRuta,
            datos.FechaInicio ?? null,
            datos.FechaFin ?? null,
            datos.Descripcion
        ];

        db.query(sql, valores, callback);
    },

    // Actualizar los datos de un incidente
    actualizar(id, datos, callback) {
        const sql = `
            UPDATE incidente
            SET IdRuta = ?,
                FechaInicio = ?,
                FechaFin = ?,
                Descripcion = ?
            WHERE IdIncidente = ?
        `;

        const valores = [
            datos.IdRuta,
            datos.FechaInicio,
            datos.FechaFin ?? null,
            datos.Descripcion,
            id
        ];

        db.query(sql, valores, callback);
    },

    // Cambiar el estado de un incidente sin eliminarlo
    actualizarEstado(id, estado, callback) {
        const sql = `
            UPDATE incidente
            SET Estado = ?
            WHERE IdIncidente = ?
        `;

        db.query(sql, [estado, id], callback);
    }
};

module.exports = Incidente;
