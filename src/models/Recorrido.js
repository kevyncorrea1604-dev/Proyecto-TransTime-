
const db = require('../config/db');

class Recorrido {
    // Consultar todos los recorridos
    static async obtenerTodos() {
        const [filas] = await db.query(`
            SELECT
                r.IdRecorrido,
                r.IdRuta,
                r.IdPuntoIntermedio,
                r.Orden,
                p.Nombre AS NombrePunto,
                p.Direccion,
                p.Latitud,
                p.Longitud,
                p.Estado
            FROM recorrido r
            INNER JOIN puntointermedio p
                ON r.IdPuntoIntermedio = p.IdPuntoIntermedio
            ORDER BY r.IdRuta ASC, r.Orden ASC
        `);

        return filas;
    }

    // Consultar un recorrido por su ID
    static async obtenerPorId(id) {
        const [filas] = await db.query(
            `SELECT * FROM recorrido
             WHERE IdRecorrido = ?`,
            [id]
        );

        return filas[0] || null;
    }

    // Consultar los puntos de una ruta en orden
    static async obtenerPorRuta(idRuta) {
        const [filas] = await db.query(`
            SELECT
                r.IdRecorrido,
                r.IdRuta,
                r.IdPuntoIntermedio,
                r.Orden,
                p.Nombre AS NombrePunto,
                p.Direccion,
                p.Latitud,
                p.Longitud,
                p.Estado
            FROM recorrido r
            INNER JOIN puntointermedio p
                ON r.IdPuntoIntermedio = p.IdPuntoIntermedio
            WHERE r.IdRuta = ?
            ORDER BY r.Orden ASC
        `, [idRuta]);

        return filas;
    }

    // Registrar un punto dentro del recorrido
    static async crear(datos) {
        const { IdPuntoIntermedio, IdRuta, Orden } = datos;

        const [resultado] = await db.query(
            `INSERT INTO recorrido
                (IdPuntoIntermedio, IdRuta, Orden)
             VALUES (?, ?, ?)`,
            [IdPuntoIntermedio, IdRuta, Orden]
        );

        return {
            IdRecorrido: resultado.insertId,
            IdPuntoIntermedio,
            IdRuta,
            Orden
        };
    }

    // Actualizar el orden de un punto
    static async actualizarOrden(id, orden) {
        const [resultado] = await db.query(
            `UPDATE recorrido
             SET Orden = ?
             WHERE IdRecorrido = ?`,
            [orden, id]
        );

        return resultado.affectedRows > 0;
    }

    static async actualizarEstado(id, estado) {
    const sql = `
        UPDATE recorrido
        SET Estado = ?
        WHERE IdRecorrido = ?
    `;

    const [resultado] = await db.query(sql, [estado, id]);
        return resultado;
    }
}

module.exports = Recorrido;
