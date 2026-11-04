
const db = require('../config/db');

const Favorito = {
    // Obtener todos los favoritos
    obtenerTodos(callback) {
        const sql = `
            SELECT IdFavorito, IdUsuario, IdRuta, Fecha
            FROM favorito
            ORDER BY Fecha DESC
        `;

        db.query(sql, callback);
    },

    // Buscar un favorito por su identificador
    obtenerPorId(id, callback) {
        const sql = `
            SELECT IdFavorito, IdUsuario, IdRuta, Fecha
            FROM favorito
            WHERE IdFavorito = ?
        `;

        db.query(sql, [id], callback);
    },

    // Consultar los favoritos de un usuario
    obtenerPorUsuario(idUsuario, callback) {
        const sql = `
            SELECT IdFavorito, IdUsuario, IdRuta, Fecha
            FROM favorito
            WHERE IdUsuario = ?
            ORDER BY Fecha DESC
        `;

        db.query(sql, [idUsuario], callback);
    },

    // Registrar una ruta como favorita
    crear(datos, callback) {
        const sql = `
            INSERT INTO favorito (IdUsuario, IdRuta)
            VALUES (?, ?)
        `;

        db.query(
            sql,
            [datos.IdUsuario, datos.IdRuta],
            callback
        );
    },

    // Actualizar el usuario o la ruta asociada al favorito
    actualizar(id, datos, callback) {
        const sql = `
            UPDATE favorito
            SET IdUsuario = ?, IdRuta = ?
            WHERE IdFavorito = ?
        `;

        db.query(
            sql,
            [datos.IdUsuario, datos.IdRuta, id],
            callback
        );
    }
};

module.exports = Favorito;
