
const db = require('../config/db');

class PuntoIntermedio {

    // Consultar todos los puntos intermedios
    static async obtenerTodos() {
        const [filas] = await db.query(`
            SELECT
                IdPuntoIntermedio,
                IdRuta,
                Nombre,
                Direccion,
                Latitud,
                Longitud,
                Estado
            FROM puntointermedio
            ORDER BY IdRuta ASC, Nombre ASC
        `);

        return filas;
    }

    // Consultar un punto intermedio por ID
    static async obtenerPorId(id) {
        const [filas] = await db.query(
            `SELECT *
             FROM puntointermedio
             WHERE IdPuntoIntermedio = ?`,
            [id]
        );

        return filas[0] || null;
    }

    // Consultar puntos intermedios de una ruta
    static async obtenerPorRuta(idRuta) {
        const [filas] = await db.query(
            `SELECT *
             FROM puntointermedio
             WHERE IdRuta = ?
             ORDER BY Nombre ASC`,
            [idRuta]
        );

        return filas;
    }

    // Registrar un punto intermedio
    static async crear(datos) {
        const {
            IdRuta,
            Nombre,
            Direccion,
            Latitud,
            Longitud,
            Estado
        } = datos;

        const [resultado] = await db.query(
            `INSERT INTO puntointermedio
                (IdRuta, Nombre, Direccion, Latitud, Longitud, Estado)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [
                IdRuta,
                Nombre,
                Direccion ?? null,
                Latitud ?? null,
                Longitud ?? null,
                Estado ?? 'Activo'
            ]
        );

        return {
            IdPuntoIntermedio: resultado.insertId,
            IdRuta,
            Nombre,
            Direccion: Direccion ?? null,
            Latitud: Latitud ?? null,
            Longitud: Longitud ?? null,
            Estado: Estado ?? 'Activo'
        };
    }

    // Actualizar los datos de un punto intermedio
    static async actualizar(id, datos) {
        const {
            IdRuta,
            Nombre,
            Direccion,
            Latitud,
            Longitud,
            Estado
        } = datos;

        const [resultado] = await db.query(
            `UPDATE puntointermedio
             SET IdRuta = ?,
                 Nombre = ?,
                 Direccion = ?,
                 Latitud = ?,
                 Longitud = ?,
                 Estado = ?
             WHERE IdPuntoIntermedio = ?`,
            [
                IdRuta,
                Nombre,
                Direccion ?? null,
                Latitud ?? null,
                Longitud ?? null,
                Estado,
                id
            ]
        );

        return resultado.affectedRows > 0;
    }

    // Cambiar el estado de un punto intermedio
    static async actualizarEstado(id, estado) {
        const [resultado] = await db.query(
            `UPDATE puntointermedio
             SET Estado = ?
             WHERE IdPuntoIntermedio = ?`,
            [estado, id]
        );

        return resultado.affectedRows > 0;
    }
}

module.exports = PuntoIntermedio;