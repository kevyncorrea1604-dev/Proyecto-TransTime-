
const db = require('../config/db');

const Mantenimiento = {
    // Consultar todos los mantenimientos con el número de buseta
    obtenerTodos(callback) {
        const sql = `
            SELECT
                m.IdMantenimiento,
                m.IdBuseta,
                b.numero_interno,
                m.Tipo,
                m.Fecha,
                m.Descripcion,
                m.Costo
            FROM mantenimiento m
            INNER JOIN buseta b ON m.IdBuseta = b.id_buseta
            ORDER BY m.Fecha DESC
        `;

        db.query(sql, callback);
    },

    // Consultar un mantenimiento por su identificador
    obtenerPorId(id, callback) {
        const sql = `
            SELECT *
            FROM mantenimiento
            WHERE IdMantenimiento = ?
        `;

        db.query(sql, [id], callback);
    },

    // Consultar los mantenimientos de una buseta específica
    obtenerPorBuseta(idBuseta, callback) {
        const sql = `
            SELECT *
            FROM mantenimiento
            WHERE IdBuseta = ?
            ORDER BY Fecha DESC
        `;

        db.query(sql, [idBuseta], callback);
    },

    // Registrar un mantenimiento nuevo
    crear(datos, callback) {
        const sql = `
            INSERT INTO mantenimiento
                (IdBuseta, Tipo, Fecha, Descripcion, Costo)
            VALUES (?, ?, ?, ?, ?)
        `;

        const valores = [
            datos.IdBuseta,
            datos.Tipo,
            datos.Fecha,
            datos.Descripcion ?? null,
            datos.Costo ?? 0
        ];

        db.query(sql, valores, callback);
    },

    // Actualizar un mantenimiento existente
    actualizar(id, datos, callback) {
        const sql = `
            UPDATE mantenimiento
            SET IdBuseta = ?,
                Tipo = ?,
                Fecha = ?,
                Descripcion = ?,
                Costo = ?
            WHERE IdMantenimiento = ?
        `;

        const valores = [
            datos.IdBuseta,
            datos.Tipo,
            datos.Fecha,
            datos.Descripcion ?? null,
            datos.Costo,
            id
        ];

        db.query(sql, valores, callback);
    },

    // Eliminar un registro de mantenimiento
    eliminar(id, callback) {
        const sql = `
            DELETE FROM mantenimiento
            WHERE IdMantenimiento = ?
        `;

        db.query(sql, [id], callback);
    }
};

module.exports = Mantenimiento;
