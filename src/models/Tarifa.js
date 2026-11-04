const db = require('../config/db');

const Tarifa = {
    // Consultar todas las tarifas
    obtenerTodas(callback) {
        const sql = `
            SELECT IdTarifa, IdRuta, Valor, Estado
            FROM tarifa
            ORDER BY IdTarifa DESC
        `;

        db.query(sql, callback);
    },

    // Consultar una tarifa por su ID
    obtenerPorId(id, callback) {
        const sql = `
            SELECT IdTarifa, IdRuta, Valor, Estado
            FROM tarifa
            WHERE IdTarifa = ?
        `;

        db.query(sql, [id], callback);
    },

    // Consultar las tarifas asociadas a una ruta
    obtenerPorRuta(idRuta, callback) {
        const sql = `
            SELECT IdTarifa, IdRuta, Valor, Estado
            FROM tarifa
            WHERE IdRuta = ?
            ORDER BY IdTarifa DESC
        `;

        db.query(sql, [idRuta], callback);
    },

    // Registrar una tarifa
    crear(datos, callback) {
        const sql = `
            INSERT INTO tarifa (IdRuta, Valor, Estado)
            VALUES (?, ?, ?)
        `;

        db.query(
            sql,
            [datos.IdRuta, datos.Valor, datos.Estado || 'Activo'],
            callback
        );
    },

    // Actualizar una tarifa
    actualizar(id, datos, callback) {
        const sql = `
            UPDATE tarifa
            SET IdRuta = ?, Valor = ?, Estado = ?
            WHERE IdTarifa = ?
        `;

        db.query(
            sql,
            [datos.IdRuta, datos.Valor, datos.Estado, id],
            callback
        );
    },

    // Cambiar el estado de una tarifa
    actualizarEstado(id, estado, callback) {
        const sql = `
            UPDATE tarifa
            SET Estado = ?
            WHERE IdTarifa = ?
        `;

        db.query(sql, [estado, id], callback);
    }
};

module.exports = Tarifa;