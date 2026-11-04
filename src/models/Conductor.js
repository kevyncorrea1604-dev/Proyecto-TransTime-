
const db = require('../config/db');

class Conductor {

    // GET: consultar todos los conductores
    static async obtenerTodos() {
        const sql = `
            SELECT IdConductor, Nombre, Documento, Telefono, Estado
            FROM conductor
            ORDER BY IdConductor ASC
        `;

        const [filas] = await db.query(sql);
        return filas;
    }

    // GET: consultar un conductor por ID
    static async obtenerPorId(id) {
        const sql = `
            SELECT IdConductor, Nombre, Documento, Telefono, Estado
            FROM conductor
            WHERE IdConductor = ?
        `;

        const [filas] = await db.query(sql, [id]);
        return filas[0] || null;
    }

    // POST: registrar un conductor
    static async crear(datos) {
        const sql = `
            INSERT INTO conductor (Nombre, Documento, Telefono)
            VALUES (?, ?, ?)
        `;

        const [resultado] = await db.query(sql, [
            datos.Nombre,
            datos.Documento,
            datos.Telefono || null
        ]);

        return this.obtenerPorId(resultado.insertId);
    }

    // PUT: actualizar los datos de un conductor
    static async actualizar(id, datos) {
        const sql = `
            UPDATE conductor
            SET Nombre = ?, Documento = ?, Telefono = ?
            WHERE IdConductor = ?
        `;

        const [resultado] = await db.query(sql, [
            datos.Nombre,
            datos.Documento,
            datos.Telefono || null,
            id
        ]);

        return resultado;
    }

    // PATCH: cambiar el estado a Activo o Inactivo
    static async actualizarEstado(id, estado) {
        const sql = `
            UPDATE conductor
            SET Estado = ?
            WHERE IdConductor = ?
        `;

        const [resultado] = await db.query(sql, [estado, id]);
        return resultado;
    }
}

module.exports = Conductor;