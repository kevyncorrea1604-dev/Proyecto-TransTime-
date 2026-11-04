const db = require('../config/db');

const Usuario = {
    // Consultar todos los usuarios sin exponer el hash
    obtenerTodos: (callback) => {
        const sql = `
            SELECT IdUsuario, Nombre, CorreoElectronico, Telefono
            FROM usuario
            ORDER BY IdUsuario
        `;

        db.query(sql, callback);
    },

    // Consultar un usuario por ID sin exponer el hash
    obtenerPorId: (id, callback) => {
        const sql = `
            SELECT IdUsuario, Nombre, CorreoElectronico, Telefono
            FROM usuario
            WHERE IdUsuario = ?
        `;

        db.query(sql, [id], callback);
    },

    // Registrar un usuario con su contraseña ya cifrada mediante bcrypt
    crear: (usuario, callback) => {
        const sql = `
            INSERT INTO usuario
                (Nombre, CorreoElectronico, ContrasenaHash, Telefono)
            VALUES (?, ?, ?, ?)
        `;

        const valores = [
            usuario.Nombre,
            usuario.CorreoElectronico,
            usuario.ContrasenaHash,
            usuario.Telefono
        ];

        db.query(sql, valores, callback);
    },

    // Actualizar los datos básicos del usuario
    actualizar: (id, usuario, callback) => {
        const sql = `
            UPDATE usuario
            SET Nombre = ?, CorreoElectronico = ?, Telefono = ?
            WHERE IdUsuario = ?
        `;

        const valores = [
            usuario.Nombre,
            usuario.CorreoElectronico,
            usuario.Telefono,
            id
        ];

        db.query(sql, valores, callback);
    }
};

module.exports = Usuario;